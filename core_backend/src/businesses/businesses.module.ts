import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BusinessesController],
  providers: [ PrismaService ,BusinessesService],
})
export class BusinessesModule {}
