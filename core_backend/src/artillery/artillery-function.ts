// src/artillery/artillery-function.ts
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
let customerPool: any[] = [];

interface ArtilleryContext {
    vars: {
        customerPool?: any[];
        selectedCustomer?: any;
    };
}

export const artilleryFunctions = {
    async beforeScenario(context: ArtilleryContext) {
        try {
            console.log('Starting beforeScenario...');
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
            
            context.vars.customerPool = customerPool;
            console.log(`Loaded ${customerPool.length} customers for testing`);
        } catch (error) {
            console.error('Error loading customers:', error);
            throw error;
        }
    },

    selectRandomCustomer(context: ArtilleryContext) {
        if (customerPool.length > 0) {
            const randomCustomer = customerPool[Math.floor(Math.random() * customerPool.length)];
            context.vars.selectedCustomer = randomCustomer;
            console.log('Selected customer for transaction:', {
                msisdn: randomCustomer.msisdn,
                firstName: randomCustomer.firstName,
                balance: randomCustomer.personalBalance
            });
            
            // Pre-calculate transaction amount for logging
            const transAmount = Math.min(
                Math.floor(Math.random() * 900) + 100, 
                randomCustomer.personalBalance
            );
            console.log('Preparing transaction with amount:', transAmount);
        } else {
            console.log('No customers available to select from!');
        }
    },

    async afterScenario() {
        try {
            await prisma.$disconnect();
            console.log('Disconnected from database');
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
    }
};
