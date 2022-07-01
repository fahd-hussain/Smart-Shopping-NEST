import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserDTO {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Verification code can not be empty' })
  verification_code: string;
}

// Swagger DTO
export class VerifyUserSDTO {
  @ApiProperty({ required: true, example: 'abc@xyz.com' })
  email: string;

  @ApiProperty({ required: true })
  verification_code: string;
}
