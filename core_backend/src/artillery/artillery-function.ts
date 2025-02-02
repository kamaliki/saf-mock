// src/artillery-function.ts
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
let customerPool: any[] = [];

export const artilleryFunctions = {
    async beforeScenario(context: any) {
        try {
            if (customerPool.length === 0) {
                console.log('Loading customer pool...');
                customerPool = await prisma.customer.findMany({
                    select: {
                        msisdn: true,
                        firstName: true,
                        personalBalance: true,
                    },
                    where: {
                        personalBalance: {
                            gt: 200  // Ensure they have enough balance
                        }
                    }
                });
                console.log(`Loaded ${customerPool.length} customers for testing`);
            }
        } catch (error) {
            console.error('Error loading customers:', error);
            throw error;
        }
    },

    selectRandomCustomer(context: any) {
        if (customerPool.length > 0) {
            const randomIndex = Math.floor(Math.random() * customerPool.length);
            const customer = customerPool[randomIndex];
            
            // Remove customer from pool to avoid reuse
            customerPool.splice(randomIndex, 1);
            
            context.vars.selectedCustomer = customer;
            context.vars.transAmount = Math.min(200, customer.personalBalance);
            
            console.log(`Selected customer ${customer.msisdn} with balance ${customer.personalBalance} for transaction amount ${context.vars.transAmount}`);
        } else {
            console.log('No more customers available in the pool!');
            throw new Error('Customer pool is empty');
        }
    }
};
