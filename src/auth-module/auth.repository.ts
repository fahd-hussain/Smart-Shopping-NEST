import { UserEntity } from 'src/app-module/user-module/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterDTO } from './dto/register.dto';

@EntityRepository(AuthEntity)
export class AuthRepository extends Repository<AuthEntity> {
  register = async (createUserDTO: RegisterDTO): Promise<UserEntity> => {
    const { email, password } = createUserDTO;
    const newUser = new UserEntity();
    const newAuth = new AuthEntity();

    newUser.email = email;
    newAuth.provider_user_key = password;
    newUser.authentication = newAuth;

    await newUser.save();

    return newUser;
  }
}
