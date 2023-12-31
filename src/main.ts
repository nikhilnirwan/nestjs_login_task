import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { myFunction } from './book/dto/create-book.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
// console.log(myFunction(4, 5));
