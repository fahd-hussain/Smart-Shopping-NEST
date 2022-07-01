import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { AuthRepository } from '../auth/repository/auth.repository';
import { UserEntity } from '../user/entity/user.entity';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { VerifyUserDTO } from './dto/verify-user.dto';

const VERIFICATION_ATTEMPT_LIMIT = 3;
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

      if (!user) {
        throw new HttpException(
          'Email/password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const compare = this.authRepository.comparePassword({ user, password });

      if (!compare) {
        throw new HttpException(
          'Email/password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return user.toResponseObject();
    } catch (error) {
      throw error;
    }
  };

  verifyUser = async (verifyUserDTO: VerifyUserDTO) => {
    try {
      const { email, verification_code } = verifyUserDTO;
      const user: UserEntity = await this.userRepository.getUserByEmail({
        email,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.authentication.verified) {
        return user.toResponseObject();
      }

      if (user.authentication.blocked) {
        throw new HttpException('User is blocked', HttpStatus.UNAUTHORIZED);
      }

      if (user.authentication.failed_attempts === VERIFICATION_ATTEMPT_LIMIT) {
        user.authentication.blocked = true;
        user.save();

        throw new HttpException(
          'Too many failed attempts',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const verify = this.authRepository.verifyUser({
        user,
        verification_code,
      });

      if (!verify) {
        user.authentication.failed_attempts += 1;
        user.save();

        throw new HttpException(
          `Verification code is incorrect, ${
            VERIFICATION_ATTEMPT_LIMIT - user.authentication.failed_attempts
          } attempt(s) are left`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      user.authentication.failed_attempts = 0;
      user.authentication.verified = true;
      user.authentication.verification_code = '';
      user.authentication.verification_code_expiry = null;

      await user.save();

      return user.toResponseObject();
    } catch (error) {
      throw error;
    }
  };
}
