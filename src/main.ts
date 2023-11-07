import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('V2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion:true
      }
    })
  );

  const config = new DocumentBuilder()
  .setTitle('Toppay')
  .setDescription('Api de toppay')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.use(json({limit: '50mb'}));
  app.use(urlencoded({ extended: true, limit: '100mb'}));
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
