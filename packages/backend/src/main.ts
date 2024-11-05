import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';
  app.enableCors({
    origin: allowedOrigin,
    credentials: true
  });
  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
