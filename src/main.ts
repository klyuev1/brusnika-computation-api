import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Приложение Брусника.Расчет')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // const jwtService = new JwtService();
  // const jwtAuthGuard = new JwtAuthGuard(jwtService);
  // app.useGlobalGuards(jwtAuthGuard);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['http://localhost', 'http://51.250.90.55'],
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

start();
