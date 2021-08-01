import { IsNotEmpty } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}