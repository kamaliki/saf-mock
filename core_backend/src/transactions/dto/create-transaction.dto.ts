import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
//   @ApiProperty({
//     example: 'cuid_trans_1234567890',
//     description: 'A unique transaction identifier (e.g. "RI4F2VFZBL").',
//   })
//   transID: string;

  @ApiProperty({
    example: TransactionType.CustomerPayBillOnline,
    description: 'The type of transaction.',
  })
  transactionType: TransactionType;

//   @ApiProperty({
//     example: new Date().toISOString(),
//     description: 'The time when the transaction occurred.',
//   })
//   transTime: Date;

  @ApiProperty({
    example: 200.0,
    description: 'The amount for the transaction.',
  })
  transAmount: number;

  @ApiProperty({
    example: '12345',
    description: 'The business shortcode that references the business.',
  })
  businessShortCode: string;

  @ApiPropertyOptional({
    example: '',
    description: 'The bill reference number. It is left blank for CustomerPayBillOnline transactions.',
  })
  billRefNumber?: string;

//   @ApiProperty({
//     example: 'INVOICE1234',
//     description: 'A unique invoice number for the transaction.',
//   })
//   invoiceNumber: string;

//   @ApiProperty({
//     example: 5345.0,
//     description: 'The organization account balance of the business after the transaction is processed.',
//   })
//   orgAccountBalance: number;

  @ApiPropertyOptional({
    example: 'thirdPartyTransID123',
    description: 'An optional third party transaction ID if available.',
  })
  thirdPartyTransID?: string;

  @ApiProperty({
    example: '254700000127',
    description: 'The MSISDN (phone number) of the customer paying.',
  })
  MSISDN: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the customer paying.',
  })
  firstName: string;

  // @ApiProperty({
  //   example: 'cuid_customer_123456',
  //   description: 'The unique ID of the customer (payer).',
  // })
  // customerId: string;

  // @ApiProperty({
  //   example: 'cuid_business_123456',
  //   description: 'The unique ID of the business receiving the payment.',
  // })
  // businessId: string;
}

