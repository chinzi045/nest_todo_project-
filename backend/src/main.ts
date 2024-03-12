import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AutheeGuard } from './customGuards/authentiaction.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AutheeGuard())
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Todo App')
  .setDescription('The Todo API description')
  .setVersion('1.0')
  .addBearerAuth({
    type:'http',
    scheme:'bearer',
    bearerFormat:'JWT',
    name:'JWT',
    description:'enter Jwt Token',
    in:'header'
  },'JWT-auth')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
