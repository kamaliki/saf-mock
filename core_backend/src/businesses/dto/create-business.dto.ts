import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBusinessDto {
  @ApiProperty({
    example: '12345',
    description: 'The unique shortcode for the business.',
  })
  shortcode: string;

  @ApiProperty({
    example: 'Food Store',
    description: 'The human-readable name of the business.',
  })
  name: string;

  @ApiPropertyOptional({
    example: 0.0,
    description: 'The organizational account balance. If not provided, defaults to 0.0 in Prisma.',
  })
  orgAccountBalance?: number;

  @ApiProperty({
    example: 'cuid1234567890abc',
    description: 'The ID of the customer who owns this business.',
  })
  ownerId: string;
}
