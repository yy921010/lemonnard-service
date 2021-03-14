import { Log4JService } from '@/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'log4js';
import { Model } from 'mongoose';
import { Image } from '../schema/image.schema';
import { Vod } from '../schema/vod.schema';

@Injectable()
export class VodService {
  private logger: Logger;
  constructor(
    private readonly log4j: Log4JService,
    @InjectModel(Vod.name) private readonly vodModel: Model<Vod>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {
    this.logger = this.log4j.getLogger(VodService.name);
  }

  async saveVod(vodInfo: Vod) {
    this.logger.debug('[saveVod] vodInfo = ', vodInfo);
    if (vodInfo) {
      const createVodModel = new this.vodModel(vodInfo);
      const saveResult = await createVodModel.save();
      this.logger.debug('[saveVod] saveResult = ', saveResult);
    }
  }

  async saveImage(image: Image) {
    this.logger.debug('[saveVod] image = ', image);
    if (image) {
      const createVodModel = new this.imageModel(image);
      const saveResult = await createVodModel.save();
      this.logger.debug('[saveVod] image = ', saveResult);
    }
  }
}
