// test-db.ts
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    const prisma = new PrismaClient();
    try {
        console.log('Database URL:', process.env.DATABASE_URL);
        console.log('Attempting to connect...');
        const result = await prisma.$queryRaw`SELECT 1+1 as result`;
        console.log('Connection successful:', result);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
