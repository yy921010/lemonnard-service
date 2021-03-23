export class Image {
  id?: string;
  type?: number;
  href?: string;
  updateTime?: string;
  createTime?: string;
  deleted?: number;
  foreignId?: string;
  comment?: string;
  constructor() {
    this.id = '';
    this.type = -1;
    this.href = '';
    this.updateTime = '';
    this.createTime = '';
    this.deleted = 0;
    this.foreignId = '';
    this.comment = '';
  }
}
