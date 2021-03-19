import { Log4JService } from '@/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'log4js';
import { Model } from 'mongoose';
import { Genre } from '../schema/genre.schema';
import { Image } from '../schema/image.schema';
import { VodDocument } from '../schema/vod.schema';
import { Vod } from '../types/vod.type';

@Injectable()
export class VodService {
  private logger: Logger;
  constructor(
    private readonly log4j: Log4JService,
    @InjectModel(Vod.name) private readonly vodModel: Model<VodDocument>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {
    this.logger = this.log4j.getLogger(VodService.name);
  }

  async saveVod(vodInfo: Vod) {
    this.logger.debug('[saveVod] vodInfo = ', vodInfo);
    if (vodInfo) {
      const createVodModel = new this.vodModel(vodInfo);
      createVodModel.save(async (err) => {
        if (err) {
          this.logger.error('[saveVod] err = ', err);
          return;
        }
        const createGenreModel = new this.genreModel({
          type: '2',
          name: 'demo2',
          vods: createVodModel._id,
        });
        await createGenreModel.save();
      });
      this.logger.debug('[saveVod] saveResult = ');
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
