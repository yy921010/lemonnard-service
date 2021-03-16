import { Log4JService } from '@/common';
import { Body, Controller, Post } from '@nestjs/common';
import { Logger } from 'log4js';
import { Vod } from '../schema/vod.schema';
import { VodService } from '../service/vod.service';

@Controller('vod')
export class VodController {
  private logger: Logger;
  constructor(
    private readonly vodService: VodService,
    private readonly log4j: Log4JService,
  ) {
    this.logger = this.log4j.getLogger(VodController.name);
  }

  @Post()
  async saveVod(@Body() vodInfo: Vod) {
    this.logger.info('[saveVod] vodInfo = ', vodInfo);
    return await this.vodService.saveVod(vodInfo);
  }
}
