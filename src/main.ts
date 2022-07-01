import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

const PORT = process.env.PORT;
const API_VERSION = 'v1';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.setGlobalPrefix(`api/${API_VERSION}`);

  const options = new DocumentBuilder()
    .setTitle('Smart Shopping APP')
    .setDescription('Role based authentication')
    .setVersion(API_VERSION)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
