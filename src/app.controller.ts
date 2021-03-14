import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Vod } from './vod/schema/vod.schema';
import { Image } from './vod/schema/image.schema';
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
  @Post()
  saveVod(@Body() vodInfo: Vod) {
    this.vodService.saveVod(vodInfo);
  }
  @Post('/image')
  saveImage(@Body() img: Image) {
    this.vodService.saveImage(img);
  }
}
