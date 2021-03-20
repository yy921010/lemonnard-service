import { HttpException } from '@nestjs/common';

export class MysqlException extends HttpException {
  constructor(mysqlMessage = '') {
    super(mysqlMessage, 100000);
  }
}
