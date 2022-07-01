import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { HttpErrorFilter } from './shared/filter/http-error.filter';
import { AuthGuard } from './shared/guard/auth.guard';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
