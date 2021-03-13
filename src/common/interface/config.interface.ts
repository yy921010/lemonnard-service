import { ModuleMetadata } from '@nestjs/common';

export enum ConfigToken {
  GLOBAL_CONFIG_TOKEN = 'GLOBAL_CONFIG_TOKEN',
  GLOBAL_CONFIG_OPTION = 'GLOBAL_CONFIG_OPTION',
}

export interface ConfigModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<string> | Promise<string[]>;
  inject?: any[];
}
