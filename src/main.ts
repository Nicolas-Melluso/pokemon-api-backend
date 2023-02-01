import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Pokemon Api BackEnd')
    .setDescription('This is my description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
