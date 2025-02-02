import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
      },
    });
  }
  async findAll() {
    return this.prisma.customer.findMany();
  }

  async findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async findByMsisdn(msisdn: string) {
    return this.prisma.customer.findUnique({
      where: { msisdn },
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
