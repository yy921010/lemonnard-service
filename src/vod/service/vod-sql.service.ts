import { Injectable } from '@nestjs/common';
import { Log4JService } from '@/common';
import { HelperService } from '@/helper';
import { MysqlService } from '@/mysql2';
import { Logger } from 'log4js';
import { SqlGenerator } from 'mysqlnard';

@Injectable()
export class VodSqlService {
  private logger: Logger;
  constructor(
    private readonly log4j: Log4JService,
    private readonly helper: HelperService,
    private readonly mysql: MysqlService,
  ) {
    this.logger = this.log4j.getLogger(VodSqlService.name);
  }

  async saveTable(generalTables: any[] = [], tableName = '') {
    this.logger.debug('[saveTable] saveTable tableName=', tableName);
    this.logger.debug('[saveTable] generalTables=', generalTables);
    const insertVodSql = new SqlGenerator('insert')
      .from(tableName)
      .into<any[]>(generalTables.map((item) => this.helper.toColumnField(item)))
      .build();
    await this.mysql.execute(insertVodSql);
    this.logger.info(`[saveVod] insert ${tableName} success`);
  }
}
