import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('API document')
      .setDescription('Documentation for the backend of the Waredrop project')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.enableCors({
    origin: "http://localhost:3000",
    methods: 'GET,PUT,POST,DELETE, PATCH',
    credentials: true,
  })
  await app.listen(3001);
}
bootstrap();
