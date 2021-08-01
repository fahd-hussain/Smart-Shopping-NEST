import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/ormconfig';
import { AuthModule } from './auth-module/auth.module';
import { AppModule } from './app-module/app.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, AppModule],
})
export class MainModule {}
