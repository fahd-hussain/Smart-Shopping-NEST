import { NestFactory } from '@nestjs/core';
import ormConfig from './config/ormconfig';
import { MainModule } from './main.module';
require('dotenv').config();

// const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.setGlobalPrefix('api/v1/');
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  await app.listen(3000);
}
bootstrap();
