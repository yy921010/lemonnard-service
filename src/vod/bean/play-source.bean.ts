export class PlaySourceBean {
  id?: string;
  name?: string;
  type?: number;
  updateTime?: string;
  createTime?: string;
  deleted?: number;
  comment?: string;
  duration?: number;
  url?: string;
  vodId?: string;
  quality?: string;
  constructor() {
    this.type = -1;
    this.id = '';
    this.updateTime = 'CURRENT_TIME';
    this.createTime = 'CURRENT_TIME';
    this.deleted = 0;
    this.comment = '';
    this.duration = 0;
    this.url = '';
    this.vodId = '';
    this.quality = '';
  }
}
