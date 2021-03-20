import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { MYSQL_CLIENT } from './mysql2.constants';
import { MysqlException } from './mysql2.exception';
import { Logger } from 'log4js';
import * as sqlFormatter from 'sql-formatter';
import { Log4JService } from '@/common';

@Injectable()
export class MysqlService {
  private logger: Logger;
  constructor(
    @Inject(MYSQL_CLIENT) private readonly mysqlPool: Pool,
    private readonly log4js: Log4JService,
  ) {
    this.logger = log4js.getLogger(MysqlService.name);
  }
  async execute<T>(sqlStr: string, options?): Promise<T> {
    this.logger.debug('[MysqlService] sql ==> \n', sqlFormatter.format(sqlStr));
    const conn = await this.mysqlPool.getConnection().catch((resp) => {
      throw new MysqlException(resp.message);
    });
    let result: any[];
    if (options) {
      result = await conn.query(sqlStr, options).catch((resp) => {
        throw new MysqlException(resp.message);
      });
      conn.release();
    } else {
      result = await conn.query(sqlStr).catch((resp) => {
        throw new MysqlException(resp.message);
      });
      conn.release();
    }
    return result[0];
  }
}
