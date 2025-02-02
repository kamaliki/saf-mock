import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {

  @ApiProperty({
    example: TransactionType.CustomerPayBillOnline,
    description: 'The type of transaction.',
  })
  transactionType: TransactionType;

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

}

