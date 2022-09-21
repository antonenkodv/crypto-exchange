import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./infrastructure/common/filters/exceptions.filter";

async function bootstrap() {
  const env = process.env.NODE_ENV;
  console.log('[NODE_ENV]',env)
  const app = await NestFactory.create(AppModule);
  const port = 3000

  // filters
  app.useGlobalFilters(new AllExceptionsFilter());

    //pipes
  app.useGlobalPipes(new ValidationPipe());

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Crypto-exchange')
      .setDescription('Documentation RESP API')
      .setVersion('1.0.0')
      .addTag('Lolypto')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port).then( (_)=> console.log(`Server running on port ${port}`))
}
bootstrap();
