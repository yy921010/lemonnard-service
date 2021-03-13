import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, Log4JService } from '@/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const log4jService = app.get(Log4JService);
  const configService = app.get(ConfigService);
  app.useLogger(log4jService);
  await app.listen(configService.get('port'));
  return app;
}

bootstrap().then(async (app) => {
  const log = app.get(Log4JService).getLogger(bootstrap.name);
  log.info(`Start service is loading,server on ${await app.getUrl()}`);
});
