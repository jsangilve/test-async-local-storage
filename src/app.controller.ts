import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { globalStorage } from './globalStore';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Using AsyncLocalStorage on GET', {
      store: globalStorage.getStore(),
    });
    return this.appService.getHello();
  }

  @Post()
  createHello(@Body() body): string {
    console.log('Using AsyncLocalStorage on POST', {
      store: globalStorage.getStore(),
      body,
    });
    return 'Hello something was created';
  }
}
