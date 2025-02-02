import { Controller } from '@nestjs/common';
import { ArtilleryService } from './artillery.service';

@Controller('artillery')
export class ArtilleryController {
  constructor(private readonly artilleryService: ArtilleryService) {}
}
