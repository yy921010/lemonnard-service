import { Log4JService } from '@/common';
import { Body, Controller, Get } from '@nestjs/common';
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
    return await this.vodService.inertAllVodInfosBatch([
      {
        title: '波斯语课',
        type: 1,
        originTitle: 'Persischstunden',
        subtitle: 'Persischstunden',
        introduce: 'introduce',
        year: '20201710292',
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
            name: '中文',
          },
          {
            name: '英语',
          },
        ],
        genres: [
          {
            name: '科幻',
            type: 1,
          },
          {
            name: '惊悚',
            type: 2,
          },
        ],
        castStaff: [
          {
            name: '演员1',
            introduce: '演员1',
            type: 1,
            images: [
              {
                type: 1,
                href: 'ssss',
              },
            ],
          },
          {
            name: '演员2',
            introduce: '演员2',
            type: 1,
            images: [
              {
                type: 1,
                href: 'ssss',
              },
            ],
          },
        ],
        playSources: [
          {
            type: 1,
            comment: '片花',
            url: 'http://demo.url',
          },
          {
            type: 2,
            comment: '正片,一般为电影',
            url: 'http://demo.url',
            quality: 'hd',
          },
        ],
        seasons: [
          {
            title: '第一季',
            introduce: '介绍',
            episodes: [
              {
                playDuration: '20',
                episodeNumber: 1,
                title: '第一集',
                introduce: '第一集介绍',
                playUrl: 'http://demo.playUrl',
                images: [
                  {
                    type: 1,
                    href: 'https://demo.img.jpg',
                  },
                ],
              },
            ],
          },
          {
            title: '第一季',
            introduce: '介绍',
            episodes: [
              {
                playDuration: '20',
                episodeNumber: 2,
                title: '第一集',
                introduce: '第一集介绍',
                playUrl: 'http://demo.playUrl2',
                images: [
                  {
                    type: 1,
                    href: 'https://demo.img.jpg',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: '波斯语课',
        type: 1,
        originTitle: 'Persischstunden',
        subtitle: 'Persischstunden',
        introduce: 'introduce',
        year: '20201710292',
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
            name: '中文',
          },
          {
            name: '英语',
          },
        ],
        genres: [
          {
            name: '科幻',
            type: 1,
          },
          {
            name: '惊悚',
            type: 2,
          },
        ],
        castStaff: [
          {
            name: '演员1',
            introduce: '演员1',
            type: 1,
            images: [
              {
                type: 1,
                href: 'ssss',
              },
            ],
          },
          {
            name: '演员2',
            introduce: '演员2',
            type: 1,
            images: [
              {
                type: 1,
                href: 'ssss',
              },
            ],
          },
        ],
        playSources: [
          {
            type: 1,
            comment: '片花',
            url: 'http://demo.url',
          },
          {
            type: 2,
            comment: '正片,一般为电影',
            url: 'http://demo.url',
            quality: 'hd',
          },
        ],
        seasons: [
          {
            title: '第一季',
            introduce: '介绍',
            episodes: [
              {
                playDuration: '20',
                episodeNumber: 1,
                title: '第一集',
                introduce: '第一集介绍',
                playUrl: 'http://demo.playUrl21',
                images: [
                  {
                    type: 1,
                    href: 'https://demo.img.jpg',
                  },
                ],
              },
            ],
          },
          {
            title: '第一季',
            introduce: '介绍',
            episodes: [
              {
                playDuration: '20',
                episodeNumber: 2,
                title: '第一集',
                introduce: '第一集介绍',
                playUrl: 'http://demo.playUrl23',
                images: [
                  {
                    type: 1,
                    href: 'https://demo.img.jpg',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  }
}
