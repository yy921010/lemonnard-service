import { Module } from '@nestjs/common';
import { VodService } from './service/vod.service';
import { VodController } from './controller/vod.controller';
import { HelperModule } from '@/helper';

@Module({
  imports: [HelperModule],
  providers: [VodService],
  controllers: [VodController],
  exports: [VodService],
})
export class VodModule {}
