import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ 
    example: '254700000127', 
    description: 'Customer phone number (MSISDN)' 
  })
  msisdn: string;

  @ApiProperty({ 
    example: 'John', 
    description: 'Customer first name' 
  })
  firstName: string;

  @ApiPropertyOptional({ 
    example: 'Doe', 
    description: 'Customer last name (optional)' 
  })
  lastName?: string;

  @ApiPropertyOptional({ 
    example: 1000, 
    description: 'Initial personal balance. If not provided, it defaults to 0.0 in Prisma.' 
  })
  personalBalance?: number;
}
