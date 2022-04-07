import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { globalStorage } from '../src/globalStore';
import { randomUUID } from 'crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use((req, resp, next) => {
      globalStorage.run(
        { userId: randomUUID(), orgId: 'unknown-org-id' },
        () => {
          next();
        },
      );
    });
    await app.init();
  });

  it('/ (GET) ', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');

    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  fit('/ (POST)', async () => {
    return request(app.getHttpServer())
      .post('/')
      .send('RequestBody')
      .expect(201);
  });
});
