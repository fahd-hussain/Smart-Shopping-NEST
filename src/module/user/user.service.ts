import { Injectable } from '@nestjs/common';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(paginationDTO: PaginationDTO) {
    try {
      const users = await this.userRepository.getUsers(paginationDTO);

      if (!users) {
        return 'users not found';
      }

      const response = Promise.all(
        users.map((user) => user.toResponseObject(false)),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserById({ id }: { id: string }) {
    try {
      const user = await this.userRepository.getUserById({ id });

      if (!user) {
        return 'user not found';
      }

      return user.toResponseObject(false);
    } catch (error) {
      throw error;
    }
  }
}
