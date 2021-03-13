import { Inject, Injectable } from '@nestjs/common';
import { ConfigToken } from '../interface/config.interface';

@Injectable()
export class ConfigService {
  constructor(@Inject(ConfigToken.GLOBAL_CONFIG_TOKEN) private yamlFile = []) {}

  get<T>(key: string): T {
    return this.yamlFile[key] as T;
  }
}
