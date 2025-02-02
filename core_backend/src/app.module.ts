import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { BusinessesModule } from './businesses/businesses.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [CustomersModule, BusinessesModule, TransactionsModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
