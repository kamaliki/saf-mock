import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [PrismaService, CustomersService],
})
export class CustomersModule {}
