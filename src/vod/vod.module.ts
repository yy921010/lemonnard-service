import { Vod, VodSchema } from './schema/vod.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VodService } from './service/vod.service';
import { CastStaff, CastStaffSchema } from './schema/cast-staff.schema';
import { Definition, DefinitionsSchema } from './schema/definitions.schema';
import { Episode, EpisodeSchema } from './schema/episode.schema';
import { Genre, GenreSchema } from './schema/genre.schema';
import { Image, ImageSchema } from './schema/image.schema';
import { Season, SeasonSchema } from './schema/season.schema';
import { VodController } from './controller/vod.controller';

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
      {
        name: CastStaff.name,
        useFactory: () => {
          return CastStaffSchema;
        },
      },
      {
        name: Definition.name,
        useFactory: () => {
          return DefinitionsSchema;
        },
      },
      {
        name: Episode.name,
        useFactory: () => {
          return EpisodeSchema;
        },
      },
      {
        name: Genre.name,
        useFactory: () => {
          return GenreSchema;
        },
      },
      {
        name: Image.name,
        useFactory: () => {
          return ImageSchema;
        },
      },
      {
        name: Season.name,
        useFactory: () => {
          return SeasonSchema;
        },
      },
    ]),
  ],
  providers: [VodService],
  controllers: [VodController],
  exports: [VodService],
})
export class VodModule {}
