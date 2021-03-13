import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as fs from 'fs';
import * as yaml from 'yaml';
import {
  ConfigModuleAsyncOptions,
  ConfigService,
  ConfigToken,
  HttpSpendTimeInterceptor,
  Log4JService,
} from '.';

const createAsyncConfigOption = (
  configModuleAsyncOption: ConfigModuleAsyncOptions,
): Provider => {
  return {
    provide: ConfigToken.GLOBAL_CONFIG_OPTION,
    useFactory: configModuleAsyncOption.useFactory,
    inject: configModuleAsyncOption.inject,
  };
};
@Global()
@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: HttpSpendTimeInterceptor },
    Log4JService,
    ConfigService,
  ],
  exports: [Log4JService, ConfigService],
})
export class CommonModule {
  static forRootAsync(
    configModuleAsyncOption: ConfigModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: CommonModule,
      imports: configModuleAsyncOption.imports,
      providers: [
        {
          provide: ConfigToken.GLOBAL_CONFIG_TOKEN,
          useFactory(ymlFiles: string[] = []) {
            const files = ymlFiles.map((ymlFile) => {
              const ymlFileString = fs.readFileSync(ymlFile, 'utf-8');
              return yaml.parse(ymlFileString);
            });
            const defaultConfigFile = files.find(
              (item) => item.app.profiles.active,
            );
            if (defaultConfigFile) {
              const customConfigFile = files.find(
                (item) =>
                  item.app.profiles === defaultConfigFile.app.profiles.active,
              );
              return {
                ...defaultConfigFile.app,
                ...customConfigFile.app,
              };
            }
            return {
              ...defaultConfigFile.app,
            };
          },
          inject: [ConfigToken.GLOBAL_CONFIG_OPTION],
        },
        createAsyncConfigOption(configModuleAsyncOption),
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
