// src/artillery/artillery-functions.ts
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
let customerPool: any[] = [];

export const artilleryFunctions = {
    async initializeCustomerPool(userContext: any, events: any, done: Function) {
        try {
            customerPool = await prisma.customer.findMany({
                select: {
                    msisdn: true,
                    firstName: true,
                    personalBalance: true,
                },
                where: {
                    personalBalance: {
                        gt: 0
                    }
                }
            });
            
            userContext.vars.customerPool = customerPool;
            console.log(`Loaded ${customerPool.length} customers for testing`);
            return done();
        } catch (error) {
            console.error('Error loading customers:', error);
            return done(error);
        }
    },

    selectRandomCustomer(userContext: any, events: any, done: Function) {
        if (customerPool.length > 0) {
            const randomCustomer = customerPool[Math.floor(Math.random() * customerPool.length)];
            userContext.vars.selectedCustomer = randomCustomer;
        }
        return done();
    },

    async cleanup(userContext: any, events: any, done: Function) {
        try {
            await prisma.$disconnect();
            return done();
        } catch (error) {
            console.error('Error disconnecting:', error);
            return done(error);
        }
    }
};
// src/artillery/artillery-function.ts