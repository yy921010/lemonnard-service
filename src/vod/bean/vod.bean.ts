export class Vod {
  id?: string;
  title?: string;
  subtitle?: string;
  originTitle?: string;
  introduce?: string;
  year?: string;
  rating?: number;
  updateTime?: string;
  createTime?: string;
  episodeNumber?: number;
  fromType?: number;
  cId?: string;
  deleted?: number;
  constructor() {
    this.id = '';
    this.title = '';
    this.subtitle = '';
    this.originTitle = '';
    this.introduce = '';
    this.year = '';
    this.rating = -1;
    this.updateTime = '';
    this.createTime = '';
    this.episodeNumber = -1;
    this.fromType = -1;
    this.cId = '';
    this.deleted = 0;
  }
}
