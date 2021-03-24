export class LanguageBean {
  id?: string;
  name?: string;
  updateTime?: string;
  createTime?: string;
  deleted?: number;
  constructor() {
    this.id = '';
    this.updateTime = '';
    this.createTime = '';
    this.deleted = 0;
  }
}
