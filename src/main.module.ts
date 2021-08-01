import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/ormconfig';
import { AuthModule } from './auth-module/auth.module';
import { AppModule } from './app-module/app.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, AppModule],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }]
})
export class MainModule {}
