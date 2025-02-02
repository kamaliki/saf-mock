import { Module } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { SimulationsController } from './simulations.controller';
import { CustomersService } from 'src/customers/customers.service';
import { BusinessesService } from 'src/businesses/businesses.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SimulationsController],
  providers: [PrismaService,SimulationsService, CustomersService, BusinessesService, TransactionsService],
})
export class SimulationsModule {}
