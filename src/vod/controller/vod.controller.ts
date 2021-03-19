import { Log4JService } from '@/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Logger } from 'log4js';
import { VodService } from '../service/vod.service';
import { Vod } from '../types/vod.type';

@Controller('vod')
export class VodController {
  private logger: Logger;
  constructor(
    private readonly vodService: VodService,
    private readonly log4j: Log4JService,
  ) {
    this.logger = this.log4j.getLogger(VodController.name);
  }

  @Get()
  async saveVod(@Body() vodInfo: Vod) {
    this.logger.info('[saveVod] vodInfo = ', vodInfo);
    return await this.vodService.saveVod({
      title: 'demo',
      subtitle: 'subtitle',
      introduce: 'introduce',
      time: '20201710292',
      rating: 9.4,
      images: [
        {
          type: 1,
          href: 'http://localhost/img3',
        },
        {
          type: 1,
          href: 'http://localhost/img2',
        },
      ],
      language: [
        {
          name: 's',
        },
      ],
      genres: [
        {
          name: 'ssss',
          type: 1,
        },
        {
          name: '惊悚',
          type: 2,
        },
      ],
      castStaff: [],
      seasons: [],
    });
  }
}
