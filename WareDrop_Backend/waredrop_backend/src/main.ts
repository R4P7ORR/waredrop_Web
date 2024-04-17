import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('API document')
      .setDescription('Documentation for the backend of the Waredrop project')
      .addTag('Auth')
      .addTag('Items')
      .addTag('Permissions')
      .addTag('Roles')
      .addTag('Transactions')
      .addTag('Users')
      .addTag('Warehouses')
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
