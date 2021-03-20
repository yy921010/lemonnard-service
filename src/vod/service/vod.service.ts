import { Log4JService } from '@/common';
import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { Image } from '../schema/image.schema';
import { Vod } from '../types/vod.type';

@Injectable()
export class VodService {
  private logger: Logger;
  constructor(private readonly log4j: Log4JService) {
    this.logger = this.log4j.getLogger(VodService.name);
  }

  async saveVod(vodInfo: Vod) {
    this.logger.debug('[saveVod] vodInfo = ', vodInfo);
  }

  async saveImage(image: Image) {
    this.logger.debug('[saveVod] image = ', image);
  }
}
