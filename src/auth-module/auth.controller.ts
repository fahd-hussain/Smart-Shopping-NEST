import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, RegisterSDTO, LoginSDTO, LoginDTO } from './dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterSDTO })
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @ApiBody({ type: LoginSDTO })
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
