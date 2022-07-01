import { IsEmail, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  password: string;
}

// Swagger DTO
export class LoginSDTO {
  @ApiProperty({ required: true, example: 'abc@xyz.com' })
  email: string;

  @ApiProperty({ required: true, minLength: 6 })
  password: string;
}
