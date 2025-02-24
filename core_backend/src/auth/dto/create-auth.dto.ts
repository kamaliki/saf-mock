import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({ 
        description: 'The phone number of the User',
        example: '254700000127',
    })
    phone: string;
    @ApiProperty({
        description: 'The pin of the User',
        example: '1234',
    })
    pin: string;
}
