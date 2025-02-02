import { Test, TestingModule } from '@nestjs/testing';
import { ArtilleryController } from './artillery.controller';
import { ArtilleryService } from './artillery.service';

describe('ArtilleryController', () => {
  let controller: ArtilleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtilleryController],
      providers: [ArtilleryService],
    }).compile();

    controller = module.get<ArtilleryController>(ArtilleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
