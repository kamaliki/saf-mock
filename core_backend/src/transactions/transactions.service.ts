import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      // Retrieve the customer (payer)
      const customer = await tx.customer.findUnique({
        where: { msisdn: createTransactionDto.MSISDN },
      });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${createTransactionDto.MSISDN} not found`);
      }

      // Retrieve the business (recipient)
      const business = await tx.business.findUnique({
        where: { shortcode: createTransactionDto.businessShortCode },
      });
      if (!business) {
        throw new NotFoundException(`Business with ID ${createTransactionDto.businessShortCode} not found`);
      }

      // Convert the transaction amount to a Prisma Decimal
      const transAmountDecimal = new Prisma.Decimal(createTransactionDto.transAmount);

      // Check if customer has sufficient balance
      if (customer.personalBalance.lt(transAmountDecimal)) {
        throw new BadRequestException(
          `Insufficient balance. Available balance is ${customer.personalBalance.toFixed(
            2,
          )}, but transaction amount is ${transAmountDecimal.toFixed(2)}`,
        );
      }

      // Deduct the amount from the customer's personal balance
      await tx.customer.update({
        where: { id: customer.id },
        data: {
          personalBalance: customer.personalBalance.minus(transAmountDecimal),
        },
      });

      // Increase the business's organizational account balance
      await tx.business.update({
        where: { id: business.id },
        data: {
          orgAccountBalance: business.orgAccountBalance.plus(transAmountDecimal),
        },
      });

      //generate a unique transaction ID of 20 characters
      let transID = (Math.random().toString(36).substring(2, 22)).toUpperCase();
      let invoiceNumber = ('INVOICE-' + Math.random().toString(36).substring(2, 12)).toUpperCase();
      let transTime = new Date().toISOString();

      // Create the transaction record
      const transaction = await tx.transaction.create({
        data: {
          transID: transID,
          transactionType: createTransactionDto.transactionType,
          transTime:transTime,
          transAmount: transAmountDecimal,
          businessShortCode: createTransactionDto.businessShortCode,
          billRefNumber: createTransactionDto.billRefNumber,
          invoiceNumber: invoiceNumber,
          orgAccountBalance: business.orgAccountBalance.plus(transAmountDecimal),
          thirdPartyTransID: createTransactionDto.thirdPartyTransID,
          MSISDN: createTransactionDto.MSISDN,
          firstName: createTransactionDto.firstName,
          customerId: customer.id,
          businessId: business.id,
        },
      });

      return transaction;
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }

  async findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
