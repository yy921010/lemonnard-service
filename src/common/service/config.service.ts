import { Inject, Injectable } from '@nestjs/common';
import { ConfigToken } from '../interface/config.interface';

@Injectable()
export class ConfigService {
  constructor(@Inject(ConfigToken.GLOBAL_CONFIG_TOKEN) private yamlFile = []) {}

  get(key: string): Record<string, any> | string | any[] | number | any {
    return this.yamlFile[key] || '';
  }
}
