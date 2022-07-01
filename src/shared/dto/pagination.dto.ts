import { IsPositive, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class PaginationDTO {
  @IsPositive()
  @Max(50)
  @Column({
    default: 20,
    type: 'number',
  })
  limit: number;

  @IsPositive()
  @Min(1)
  @Column({
    default: 1,
    type: 'number',
  })
  page: number;

  @IsString()
  sortby: string;
}

// Swagger DTO
export class PaginationSDTO {
  @ApiProperty({
    description: 'Number of documents',
    maximum: 50,
    required: false,
  })
  limit: number;

  @ApiProperty({
    description: 'Page number',
    minimum: 1,
    required: false,
  })
  page: number;

  @ApiProperty({
    description: 'Sort order',
    required: false,
  })
  sortby: string;
}
