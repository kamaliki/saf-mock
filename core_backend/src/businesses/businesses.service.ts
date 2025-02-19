import { Inject,Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from 'src/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class BusinessesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    
  ) {
    
  }

  async create(createBusinessDto: CreateBusinessDto) {
    return this.prisma.business.create({
      data: {
        ...createBusinessDto,
      },
    });
  }

  async findAll() {
    return this.prisma.business.findMany();
  }

  async findOne(id: string) {
    const cacheKey = `business_${id}`;
    const cacheValue = await this.cacheManager.get(cacheKey);
    console.log('cacheValue business', cacheValue);
    if (cacheValue) {
      return cacheValue;
    }
    const business = await this.prisma.business.findUnique({
      where: { id },
    });
    if (business) {
      await this.cacheManager.set(cacheKey, business);
    }
    return business;
  }

  async update(id: string, updateBusinessDto: UpdateBusinessDto) {
    return this.prisma.business.update({
      where: { id },
      data: updateBusinessDto,
    });
  }

  async remove(id: string) {
    return this.prisma.business.delete({
      where: { id },
    });
  }
}
