export class CastStaffBean {
  id?: string;
  type?: number;
  name?: string;
  updateTime?: string;
  createTime?: string;
  deleted?: number;
  introduce?: string;
  constructor() {
    this.id = '';
    this.type = -1;
    this.updateTime = '';
    this.createTime = '';
    this.deleted = 0;
  }
}
