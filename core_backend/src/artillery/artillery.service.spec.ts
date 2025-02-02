import { Test, TestingModule } from '@nestjs/testing';
import { ArtilleryService } from './artillery.service';

describe('ArtilleryService', () => {
  let service: ArtilleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtilleryService],
    }).compile();

    service = module.get<ArtilleryService>(ArtilleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
