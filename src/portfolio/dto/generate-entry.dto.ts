import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class GenerateEntryDto {
  @ApiProperty({
    required: true,
    example: '60',
  })
  @IsNotEmpty()
  desiredVolumeInTons: number;
}