import { UserRepository } from 'src/app-module/user-module/repository/user.repository';
import { RegisterDTO } from './dto/register.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserEntity } from 'src/app-module/user-module/entity/user.entity';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  register = async (registerDTO: RegisterDTO) => {
    try {
      const user: UserEntity = await this.authRepository.register(registerDTO);

      if (user) {
        return user.toResponseObject();
      }
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException('Email already exist', HttpStatus.CONFLICT);
      }

      throw error;
    }
  };

  login = async (loginDTO: LoginDTO) => {
    try {
      const { email, password } = loginDTO;
      const user: UserEntity = await this.userRepository.getUserByEmail({
        email,
      });
      const compare = this.authRepository.comparePassword({ user, password });

      if (compare) {
        return user.toResponseObject();
      }
    } catch (error) {
      if (error.name == 'EntityNotFoundError') {
        throw new HttpException(
          'Email/password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw error;
    }
  };
}
