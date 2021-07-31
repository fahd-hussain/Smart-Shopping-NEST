import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'src/config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig)],
})
export class AppModule {}
