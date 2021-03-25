import { Module } from '@nestjs/common';
import { VodService } from './service/vod.service';
import { VodController } from './controller/vod.controller';
import { HelperModule } from '@/helper';
import { VodSqlService } from '@/vod/service/vod-sql.service';

@Module({
  imports: [HelperModule],
  providers: [VodService, VodSqlService],
  controllers: [VodController],
  exports: [VodService],
})
export class VodModule {}
