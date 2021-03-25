export class GenreBean {
  id?: string;
  name?: string;
  type?: number;
  updateTime?: string;
  createTime?: string;
  deleted?: number;
  constructor() {
    this.type = -1;
    this.id = '';
    this.updateTime = 'CURRENT_TIME';
    this.createTime = 'CURRENT_TIME';
    this.deleted = 0;
  }
}
