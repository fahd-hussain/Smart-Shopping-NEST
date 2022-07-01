import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  getUsers = async ({ limit, page, sortby }: PaginationDTO) => {
    return await this.find({
      skip: page,
      take: limit,
      ...(sortby && { order: { [sortby]: 'ASC' } }),
    });
  };

  getUserByEmail = async ({ email }): Promise<UserEntity> => {
    return await this.findOne({ email }, { relations: ['authentication'] });
  };

  getUserById = async ({ id }): Promise<UserEntity> => {
    return await this.findOne({ id });
  };
}
