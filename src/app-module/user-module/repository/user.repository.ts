import { AuthEntity } from 'src/auth-module/auth.entity';
import { LoginDTO } from 'src/auth-module/dto/login.dto';
import { RegisterDTO } from 'src/auth-module/dto/register.dto';
import { EntityRepository, Repository } from 'typeorm';
// import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  getUserByEmail = async ({ email }): Promise<any> => {
    return await this.findOneOrFail(
      { email },
      { relations: ['authentication'] },
    );
  };
}
