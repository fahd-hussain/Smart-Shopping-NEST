import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDTO, LoginSDTO } from './dto/login.dto';
import { RegisterDTO, RegisterSDTO } from './dto/register.dto';
import { VerifyUserDTO, VerifyUserSDTO } from './dto/verify-user.dto';

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
  login(@Body() registerDTO: LoginDTO) {
    return this.authService.login(registerDTO);
  }

  @ApiBody({ type: VerifyUserSDTO })
  @Post('verify-user')
  @UsePipes(new ValidationPipe())
  verifyUser(@Body() verifyUserDTO: VerifyUserDTO) {
    return this.authService.verifyUser(verifyUserDTO);
  }
}
