import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository, UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
