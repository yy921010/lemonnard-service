import { Vod, VodSchema } from './schema/vod.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VodService } from './service/vod.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Vod.name,
        useFactory: () => {
          const schema = VodSchema;
          schema.pre('save', () => console.log('pre save hook'));
          return schema;
        },
      },
    ]),
  ],
  providers: [VodService],
  controllers: [],
  exports: [VodService],
})
export class VodModule {}
