import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MysqlService } from './mysql2.service';
import { MysqlModuleAsyncOptions } from './mysql2.interface';
import { MYSQL_CLIENT, MYSQL_CONFIG_OPTION } from './mysql2.constants';
import { ConnectionOptions } from 'mysql2';
import { createPool } from 'mysql2/promise';

/**
 * 创建mysql实例
 */
const creatMysqlPool = (): Provider => {
  return {
    provide: MYSQL_CLIENT,
    useFactory: async (mysqlModuleConfig: ConnectionOptions) => {
      return createPool(mysqlModuleConfig);
    },
    inject: [MYSQL_CONFIG_OPTION],
  };
};

const createAsyncMysqlOptions = (
  mysqlModuleAsyncOptions: MysqlModuleAsyncOptions,
): Provider => {
  return {
    provide: MYSQL_CONFIG_OPTION,
    useFactory: mysqlModuleAsyncOptions.useFactory,
    inject: mysqlModuleAsyncOptions.inject,
  };
};

@Module({
  providers: [MysqlService],
  exports: [MysqlService],
})
export class MysqlModule {
  static forRootAsync(
    mysqlModuleAsyncOptions: MysqlModuleAsyncOptions,
  ): DynamicModule {
    return {
      global: true,
      module: MysqlModule,
      imports: mysqlModuleAsyncOptions.imports,
      providers: [
        creatMysqlPool(),
        createAsyncMysqlOptions(mysqlModuleAsyncOptions),
      ],
      exports: [MysqlService],
    };
  }
}
