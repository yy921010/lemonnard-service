import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConnectionOptions } from 'mysql2';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CommonModule,
  ConfigService,
  HttpRequestMiddleware,
  Log4JService,
} from './common';
import { HelperModule, HelperService } from './helper';
import { MysqlModule } from './mysql2';
import { VodModule } from './vod/vod.module';

@Module({
  imports: [
    MysqlModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
        logger: Log4JService,
      ) => {
        logger
          .getLogger(MysqlModule.name)
          .info('[config]', configService.get('mysql'));
        return configService.get<ConnectionOptions>('mysql');
      },
      inject: [ConfigService, Log4JService],
    }),
    CommonModule.forRootAsync({
      async useFactory() {
        return ['resources/application.yml', 'resources/application-dev.yml'];
      },
    }),
    HelperModule,
    VodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HttpRequestMiddleware).forRoutes('*');
  }
}
