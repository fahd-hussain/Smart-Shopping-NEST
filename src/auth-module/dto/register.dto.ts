import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @MinLength(6, {
    message: 'Length of password is too short. Minimun length is 6',
  })
  password: string;
}

// Swagger DTO
export class RegisterSDTO {
  @ApiProperty({ uniqueItems: true, required: true, example: 'abc@xyz.com' })
  email: string;

  @ApiProperty({ required: true, minLength: 6 })
  password: string;
}
