import { Log4JService } from '@/common';
import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { SqlGenerator } from 'mysqlnard';
import { Image } from '../schema/image.schema';
import { Vod } from '../types/vod.type';
import { Vod as VodBean } from '../bean/vod.bean';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VodService {
  private logger: Logger;
  constructor(private readonly log4j: Log4JService) {
    this.logger = this.log4j.getLogger(VodService.name);
  }

  async saveVod(vodInfo: Vod) {
    this.logger.debug('[saveVod] vodInfo = ', vodInfo);
    this.logger.info('[saveVod] enter');
    const vodBeans: VodBean[] = [];
    // fromType: 1 电影 2:电视剧
    const vodShell: VodBean = {
      id: uuidv4(),
      title: vodInfo.title,
      subtitle: vodInfo.subtitle,
      year: vodInfo.year,
      originTitle: vodInfo.originTitle,
      introduce: vodInfo.introduce,
      rating: vodInfo.rating,
      cId: '-1',
      fromType: 12,
      deleted: 0,
    };
    const vodSeasonBeanList = vodInfo.seasons.map((item) => {
      const { episodes } = item;
      // if (episodes.length > 0) {
      //   return episodes.map((episode) => {
      //     return {
      //       id: uuidv4(),
      //       title: episode.title,
      //       introduce: episode.introduce,
      //       episodeNumber: episode.episodeNumber,
      //       fromType: 34,
      //     } as VodBean;
      //   });
      // }
      return {
        id: uuidv4(),
        title: item.title,
        introduce: item.introduce,
        fromType: 23,
        cId: vodShell.id,
      } as VodBean;
    });

    this.logger.info('vodBeanList', vodSeasonBeanList);

    const insertVodSql = new SqlGenerator('insert')
      .from('lemon_b_vod')
      .into<VodBean[]>(vodBeans)
      .build();
    const insertVodTable = `insert into tf_b_vod (name, sub_title,)`;
  }

  async saveImage(image: Image) {
    this.logger.debug('[saveVod] image = ', image);
  }
}
