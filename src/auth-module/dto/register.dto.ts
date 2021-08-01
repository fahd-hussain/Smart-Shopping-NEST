import { IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
