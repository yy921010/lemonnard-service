import { ModuleMetadata } from '@nestjs/common';
import { ConnectionOptions } from 'mysql2';

export interface MysqlModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<ConnectionOptions> | Promise<ConnectionOptions[]>;
  inject?: any[];
}
