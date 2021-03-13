import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CommonModule,
  ConfigService,
  HttpRequestMiddleware,
  Log4JService,
} from './common';
import { HelperModule } from './helper';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
        logger: Log4JService,
      ) => {
        logger
          .getLogger(AppModule.name)
          .info('[mongo config]', configService.get('mongo'));
        return configService.get<MongooseModuleOptions>('mongo');
      },
      inject: [ConfigService, Log4JService],
    }),
    CommonModule.forRootAsync({
      async useFactory() {
        return ['resources/application.yml', 'resources/application-dev.yml'];
      },
    }),
    HelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HttpRequestMiddleware).forRoutes('*');
  }
}
