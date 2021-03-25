export class LanguageBean {
  id?: string;
  name?: string;
  updateTime?: string;
  createTime?: string;
  deleted?: number;
  constructor() {
    this.id = '';
    this.updateTime = 'CURRENT_TIME';
    this.createTime = 'CURRENT_TIME';
    this.deleted = 0;
  }
}
