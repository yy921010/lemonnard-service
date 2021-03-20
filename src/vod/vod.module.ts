import { Module } from '@nestjs/common';
import { VodService } from './service/vod.service';
import { VodController } from './controller/vod.controller';

@Module({
  imports: [],
  providers: [VodService],
  controllers: [VodController],
  exports: [VodService],
})
export class VodModule {}
