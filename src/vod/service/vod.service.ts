import { Log4JService } from '@/common';
import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { Vod } from '../types/vod.type';
import { Vod as VodBean } from '../bean/vod.bean';
import { HelperService } from '@/helper';
import { Image } from '../bean/image.bean';
import { MysqlService } from '@/mysql2';
import { CastStaffBean } from '@/vod/bean/cast-staff.bean';
import { LanguageBean } from '@/vod/bean/language.bean';
import { GenreBean } from '@/vod/bean/genre.bean';
import { PlaySourceBean } from '@/vod/bean/play-source.bean';
import { v4 as uuidv4 } from 'uuid';
import { VodSqlService } from '@/vod/service/vod-sql.service';

@Injectable()
export class VodService {
  private logger: Logger;

  constructor(
    private readonly log4j: Log4JService,
    private readonly helper: HelperService,
    private readonly mysql: MysqlService,
    private readonly vodSqlService: VodSqlService,
  ) {
    this.logger = this.log4j.getLogger(VodService.name);
  }

  /**
   * 封装vod info
   * @param vodArrayIdHas
   */
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

  /**
   * 获得所有图片
   * @param vodArrayIdHas
   */
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
    return vodArrayIdHas.map(({ castStaff, id }) => {
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
    return vodArrayIdHas.map(({ language, id }) => {
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
    return vodArrayIdHas.map(({ genres, id }) => {
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

  getBaseTableData4PlaySource(vodArrayIdHas: Vod[]) {
    const genreBean = new PlaySourceBean();
    return vodArrayIdHas.map(({ id, playSources, seasons }) => {
      const vodPlayUrls: PlaySourceBean[] = playSources.map((item) => {
        return {
          ...genreBean,
          id: item.id,
          type: item.type,
          url: item.url,
          vodId: id,
          quality: item.quality,
          duration: item.duration || 0,
        };
      });

      const episodePlayUrl = seasons.map(({ episodes }) => {
        return episodes.map(({ id, playUrl }) => {
          return {
            ...genreBean,
            id: uuidv4(),
            type: 3,
            url: playUrl,
            vodId: id,
          };
        });
      });
      const onFlattenEpisodeList = this.helper.flatten(episodePlayUrl, 2);
      return [...onFlattenEpisodeList, ...vodPlayUrls];
    });
  }

  async inertAllVodInfosBatch(vods: Vod[]) {
    const vodArrayIdHas = this.helper.setArrayId<Vod>(vods);
    // 存储影片
    const baseTableVods = this.getBaseTableData4Vod(vodArrayIdHas);
    await this.vodSqlService.saveTable(baseTableVods, 'lemon_b_vod');
    //存储图片
    const baseTableImgs = this.getBaseTableData4Images(vodArrayIdHas);
    await this.vodSqlService.saveTable(baseTableImgs, 'lemon_b_image');

    const baseCastStaff = this.getBaseTableData4CastStaff(vodArrayIdHas);
    const allCastStaffs = this.helper.flatten(
      baseCastStaff.map((item) => item.castStaffs),
    );
    //存储演员
    const castStaffResults = await this.vodSqlService.findAndSave(
      allCastStaffs,
      'lemon_b_cast_staff',
      'name',
      'type',
    );
    const allCastStaffsId = this.helper.flatten(
      baseCastStaff.map((item) => {
        return castStaffResults.map((cast) => {
          return {
            id: uuidv4(),
            castId: cast.id,
            vodId: item.vodId,
          };
        });
      }),
    );
    // 演员和影片的关联关系
    await this.vodSqlService.saveTable(allCastStaffsId, 'lemon_link_vod_cast');

    const languagesBase = this.getBaseTableData4Language(vodArrayIdHas);
    const allLanguages = this.helper.flatten(
      languagesBase.map((item) => item.languages),
    );
    const languageResults = await this.vodSqlService.findAndSave(
      allLanguages,
      'lemon_b_language',
      'name',
    );
    const allLanguageId = this.helper.flatten(
      languagesBase.map((item) => {
        const castIds = languageResults.map((lan) => {
          return {
            id: uuidv4(),
            languageId: lan.id,
            vodId: item.vodId,
          };
        });
        return castIds;
      }),
    );
    await this.vodSqlService.saveTable(
      allLanguageId,
      'lemon_link_vod_language',
    );

    const genresBase = this.getBaseTableData4Genre(vodArrayIdHas);
    const allGenres = this.helper.flatten(
      genresBase.map((item) => item.genres),
    );
    const genresResults = await this.vodSqlService.findAndSave(
      allGenres,
      'lemon_b_genre',
      'name',
    );
    const allGenreIds = this.helper.flatten(
      genresBase.map((item) => {
        const gIds = genresResults.map((genre) => {
          return {
            id: uuidv4(),
            genreId: genre.id,
            vodId: item.vodId,
          };
        });
        return gIds;
      }),
    );
    await this.vodSqlService.saveTable(allGenreIds, 'lemon_link_vod_genre');
    const dataPlaySource = this.getBaseTableData4PlaySource(vodArrayIdHas);
    await this.vodSqlService.saveTable(
      this.helper.flatten(dataPlaySource),
      'lemon_b_playsource',
    );
    return {
      message: '新增成功',
    };
  }
}
