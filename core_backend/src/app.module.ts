import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { BusinessesModule } from './businesses/businesses.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MetricsModule } from './metrics/metrics.module';
import { MetricsMiddleware } from './metrics/metrics.middleware';
import { SimulationsModule } from './simulations/simulations.module';
import { ArtilleryModule } from './artillery/artillery.module';

@Module({
  imports: [CustomersModule, BusinessesModule, TransactionsModule, MetricsModule, SimulationsModule, ArtilleryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*'); // Apply middleware for all routes
  }
}
