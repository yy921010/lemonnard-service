import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { VodService } from './vod/service/vod.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly vodService: VodService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
