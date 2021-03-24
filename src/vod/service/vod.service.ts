import { Log4JService } from '@/common';
import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { SqlGenerator } from 'mysqlnard';
import { Vod } from '../types/vod.type';
import { Vod as VodBean } from '../bean/vod.bean';
import { HelperService } from '@/helper';
import { Image } from '../bean/image.bean';
import { MysqlService } from '@/mysql2';
import { CastStaffBean } from '@/vod/bean/cast-staff.bean';
import { LanguageBean } from '@/vod/bean/language.bean';
import { GenreBean } from '@/vod/bean/genre.bean';

@Injectable()
export class VodService {
  private logger: Logger;

  constructor(
    private readonly log4j: Log4JService,
    private readonly helper: HelperService,
    private readonly mysql: MysqlService,
  ) {
    this.logger = this.log4j.getLogger(VodService.name);
  }

  getBaseTableData4Vod(vodArrayIdHas: Vod[]) {
    this.logger.info('[insertImages] enter getBaseTableData4Vod >>>>');
    const vodBean = new VodBean();
    const vodMapFields = vodArrayIdHas.map((vod) => {
      const vodShell: VodBean = {
        ...vodBean,
        id: vod.id,
        title: vod.title,
        subtitle: vod.subtitle,
        year: vod.year,
        originTitle: vod.originTitle,
        introduce: vod.introduce,
        rating: vod.rating,
        cId: '-1',
        fromType: 12,
        deleted: 0,
      };
      const seasonEpisodes = vod.seasons.map((item) => {
        const { episodes } = item;
        const seasonMap = {
          ...vodBean,
          id: item.id,
          title: item.title,
          introduce: item.introduce,
          fromType: 23,
          cId: vod.id,
          deleted: 0,
        };
        let episodeMaps = [];
        if (episodes.length > 0) {
          episodeMaps = episodes.map((episode) => {
            return {
              ...vodBean,
              id: episode.id,
              title: episode.title,
              introduce: episode.introduce,
              episodeNumber: episode.episodeNumber,
              fromType: 34,
              cId: item.id,
              deleted: 0,
            };
          });
        }
        return [seasonMap, ...episodeMaps];
      });
      return [vodShell, ...seasonEpisodes];
    });
    return this.helper.flatten(vodMapFields, 2);
  }

  getBaseTableData4Images(vodArrayIdHas: Vod[]) {
    this.logger.info('[insertImages] enter getBaseTableData4Images >>>>');
    const imageBean = new Image();
    const imgMapFields = vodArrayIdHas.map(
      ({ images, id, seasons, castStaff }) => {
        const vodImages = images.map((img) => {
          return {
            ...imageBean,
            id: img.id,
            href: img.href,
            type: img.type,
            foreignId: id,
          };
        });
        const episodeImg = [];
        seasons.forEach(({ episodes }) => {
          episodes.forEach((episode) => {
            episode.images.forEach((img) => {
              const tableImage = {
                ...imageBean,
                id: img.id,
                href: img.href,
                type: img.type,
                foreignId: episode.id,
              };
              episodeImg.push(tableImage);
            });
          });
        });

        const castStaffImg = [];
        castStaff.forEach((castStaff) => {
          castStaff.images.forEach((img) => {
            const tableImage = {
              ...imageBean,
              id: img.id,
              href: img.href,
              type: img.type,
              foreignId: castStaff.id,
            };
            castStaffImg.push(tableImage);
          });
        });

        return [...vodImages, ...episodeImg, ...castStaffImg];
      },
    );
    return this.helper.flatten(imgMapFields, 2);
  }

  getBaseTableData4CastStaff(vodArrayIdHas: Vod[]) {
    const castStaffBean = new CastStaffBean();
    vodArrayIdHas.map(({ castStaff, id }) => {
      const castStaffs = castStaff.map((cast) => {
        return {
          ...castStaffBean,
          type: cast.type,
          introduce: cast.introduce,
          name: cast.name,
          id: cast.id,
        };
      });
      return {
        vodId: id,
        castStaffs,
      };
    });
  }

  getBaseTableData4Language(vodArrayIdHas: Vod[]) {
    const languageBean = new LanguageBean();
    vodArrayIdHas.map(({ language, id }) => {
      const languages = language.map((lang) => {
        return {
          ...languageBean,
          name: lang.name,
          id: lang.id,
        };
      });
      return {
        vodId: id,
        languages,
      };
    });
  }

  getBaseTableData4Genre(vodArrayIdHas: Vod[]) {
    const genreBean = new GenreBean();
    vodArrayIdHas.map(({ genres, id }) => {
      const genreList = genres.map((genre) => {
        return {
          ...genreBean,
          name: genre.name,
          id: genre.id,
          type: genre.type,
        };
      });
      return {
        vodId: id,
        genres: genreList,
      };
    });
  }

  async inertAllVodInfosBatch(vods: Vod[]) {
    const vodArrayIdHas = this.helper.setArrayId<Vod>(vods);
    console.log(this.getBaseTableData4Vod(vodArrayIdHas));
    console.log(this.getBaseTableData4Images(vodArrayIdHas));
    console.log(this.getBaseTableData4CastStaff(vodArrayIdHas));
    console.log(this.getBaseTableData4Language(vodArrayIdHas));
    console.log(this.getBaseTableData4Genre(vodArrayIdHas));
  }
}
