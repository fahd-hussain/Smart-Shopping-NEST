import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { AuthEntity } from '../entity/auth.entity';
import { RegisterDTO } from '../dto/register.dto';

@EntityRepository(AuthEntity)
export class AuthRepository extends Repository<AuthEntity> {
  register = async ({ email, password }: RegisterDTO): Promise<UserEntity> => {
    const newUser = new UserEntity();
    const newAuth = new AuthEntity();

    let updateTime: number = Date.now();
    newAuth.verification_code_expiry = updateTime + 15 * 60 * 1000;

    newUser.email = email;
    newAuth.password = password;
    newUser.authentication = newAuth;

    await newUser.save();

    return newUser;
  };

  comparePassword = async ({
    user,
    password,
  }: {
    user: UserEntity;
    password: string;
  }): Promise<boolean> => {
    return await user.authentication.comparePassword(password);
  };

  verifyUser = async ({
    user,
    verification_code,
  }: {
    user: UserEntity;
    verification_code: string;
  }): Promise<boolean> => {
    if (Date.now() >= user.authentication.verification_code_expiry) {
      return false;
    }

    return await user.authentication.compareVerificationCode(verification_code);
  };
}
