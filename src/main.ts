import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalStorage } from './globalStore';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, resp, next) => {
    globalStorage.run(
      { userId: 'unknown-user-id', orgId: 'unknown-org-id' },
      () => {
        next();
      },
    );
  });
  await app
    .listen(3000)
    .then((app) => console.log('The app is listening in port 3000'));
}
bootstrap();
