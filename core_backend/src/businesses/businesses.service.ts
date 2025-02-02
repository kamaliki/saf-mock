import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.business.findUnique({
      where: { id },
    });
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
