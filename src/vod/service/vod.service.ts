import { Log4JService } from '@/common';
import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { SqlGenerator } from 'mysqlnard';
import { Vod } from '../types/vod.type';
import { Vod as VodBean } from '../bean/vod.bean';
import { v4 as uuidv4 } from 'uuid';
import { HelperService } from '@/helper';
import { Image } from '../bean/image.bean';

@Injectable()
export class VodService {
  private logger: Logger;

  constructor(
    private readonly log4j: Log4JService,
    private readonly helper: HelperService,
  ) {
    this.logger = this.log4j.getLogger(VodService.name);
  }

  async saveVod(vodInfo: Vod) {
    this.logger.debug('[saveVod] vodInfo = ', vodInfo);
    this.logger.info('[saveVod] enter >>>>');
    const vod = new VodBean();
    const vodShell: VodBean = {
      ...vod,
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
    const seasonEpisodes = vodInfo.seasons.map((item) => {
      const { episodes } = item;
      const seasonMap = {
        ...vod,
        id: uuidv4(),
        title: item.title,
        introduce: item.introduce,
        fromType: 23,
        cId: vodShell.id,
        deleted: 0,
      };
      let episodeMaps = [];
      if (episodes.length > 0) {
        episodeMaps = episodes.map((episode) => {
          return {
            ...vod,
            id: uuidv4(),
            title: episode.title,
            introduce: episode.introduce,
            episodeNumber: episode.episodeNumber,
            fromType: 34,
            cId: seasonMap.id,
            deleted: 0,
          };
        });
      }
      return [seasonMap, ...episodeMaps];
    });

    let vodListField = [vodShell, ...seasonEpisodes];
    vodListField = this.helper.flatten(vodListField);
    await this.insertImages(vodInfo, vodListField);
    this.logger.debug('[saveVod] vodListField', vodListField);
    const insertVodSql = new SqlGenerator('insert')
      .from('lemon_b_vod')
      .into<any[]>(vodListField.map((item) => this.helper.toColumField(item)))
      .build();

    this.logger.debug('[saveVod]', 'insertVodSql=', insertVodSql);
  }

  async insertImages(vodInfo: Vod, vodTableList: VodBean[] | any[]) {
    this.logger.info('[insertImages] enter insertImage >>>>');
    const { images, seasons } = vodInfo;
    const imageBean = new Image();
    images.map((item) => {
      return {
        ...imageBean,
        id: uuidv4(),
        href: item.href,
        type: item.type,
      };
    });
  }
}
