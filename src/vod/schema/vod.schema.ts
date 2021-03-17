import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { CastStaff, CastStaffSchema } from './cast-staff.schema';
import { Genre, GenreSchema } from './genre.schema';
import { Image, ImageSchema } from './image.schema';
import { Season, SeasonSchema } from './season.schema';

export type VodDocument = Vod;
@Schema()
export class Vod extends Document {
  @Prop({
    type: String,
    default: '',
  })
  title: string;
  @Prop({
    type: String,
    default: '',
  })
  subtitle: string;
  @Prop({
    type: String,
    default: '',
  })
  introduce: string;
  @Prop({
    type: String,
    default: '',
  })
  time: string;
  @Prop({
    type: Number,
    default: -1,
  })
  rating: number;
  @Prop({
    type: [ImageSchema],
  })
  images: Image[];
  @Prop({
    type: [String],
    default: [],
  })
  language: string[];
  //需要多对多
  @Prop({
    type: [
      {
        type: SchemaMongoose.Types.ObjectId,
        ref: 'Genre',
      },
    ],
  })
  genreIds: string[];
  //需要多对多
  @Prop({
    type: [
      {
        type: SchemaMongoose.Types.ObjectId,
        ref: 'CastStaff',
      },
    ],
  })
  castStaff: CastStaff[];
  @Prop({
    type: [SeasonSchema],
  })
  seasons: Season[];
}

export const VodSchema = SchemaFactory.createForClass(Vod);
