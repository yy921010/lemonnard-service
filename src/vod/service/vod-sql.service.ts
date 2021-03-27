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
    if (generalTables.length === 0) {
      this.logger.info(`[saveVod] generalTables isEmpty`);
      return;
    }
    const insertVodSql = new SqlGenerator('insert')
      .from(tableName)
      .into<any[]>(generalTables.map((item) => this.helper.toColumnField(item)))
      .build();
    await this.mysql.execute(insertVodSql);
    this.logger.info(`[saveVod] insert ${tableName} success`);
  }

  async findAndSave(
    generalTables: any[] = [],
    tableName = '',
    ...queryFields: string[]
  ) {
    this.logger.info('[findAndSave] enter');
    // 判断数据库中是否存在此数据，如果存在则新增
    // 针对 many to many
    const getData4Exits = generalTables.map(async (item) => {
      const queryConditionMap = {};
      queryFields.forEach((qField) => [
        (queryConditionMap[`${qField}`] = item[qField]),
      ]);
      const exitId = await this.mysql.execute(
        new SqlGenerator('select')
          .field('id')
          .from(tableName)
          .where({
            ...queryConditionMap,
          })
          .build(),
      );
      if (!this.helper.isEmpty(exitId)) {
        item.tableExit = true;
        item.id = exitId[0].id;
      }
      return item;
    });
    const getResult = await Promise.all(getData4Exits);
    await this.saveTable(
      getResult.filter((item) => !item.tableExit),
      tableName,
    );
    this.logger.debug('[findAndSave] getResult = ', getResult);
    return getResult;
  }
}
