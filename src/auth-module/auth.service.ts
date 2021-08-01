// import { CreateUserDTO } from 'src/app-module/user-module/dto/create-user.dto';
import { UserRepository } from 'src/app-module/user-module/repository/user.repository';
import { RegisterDTO } from './dto/register.dto';
import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { AuthEntity } from './auth.entity';
import { UserEntity } from 'src/app-module/user-module/entity/user.entity';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) { }

  register = async (registerDTO: RegisterDTO) => {
    try {
      const { password } = registerDTO;

      const salt = await genSalt(+process.env.SALT_LEN);
      const hashedPassword = await hash(password, salt);

      registerDTO.password = hashedPassword;

      const user: UserEntity = await this.authRepository.register( registerDTO );

      if (user) {
        console.log('userCreated');
      }
    } catch (error) {
      if (error.errno === 1062) {
        const newError = 'User already exist';
        // throw
        console.log(newError);
      }
      console.log(error);
      throw error;
    }
  };

  login = async (loginDTO: LoginDTO) => {
    const { email, password } = loginDTO;
    const user: UserEntity = await this.userRepository.getUserByEmail({ email });

    const comp = await compare(password, user.authentication.provider_user_key);

    if (comp){
      console.log("HO GAYA");
    }
  }
}
