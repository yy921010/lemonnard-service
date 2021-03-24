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
    this.updateTime = '';
    this.createTime = '';
    this.deleted = 0;
  }
}
