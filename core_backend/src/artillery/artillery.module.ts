import { Module } from '@nestjs/common';
import { ArtilleryService } from './artillery.service';
import { ArtilleryController } from './artillery.controller';

@Module({
  controllers: [ArtilleryController],
  providers: [ArtilleryService],
})
export class ArtilleryModule {}
