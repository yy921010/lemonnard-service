import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Image, ImageSchema } from './image.schema';
import { Definition, DefinitionsSchema } from './definitions.schema';

@Schema()
export class Episode extends Document {
  @Prop({
    default: '',
    type: String,
  })
  title: string;
  @Prop({
    default: '',
    type: String,
  })
  playDuration: string;
  @Prop({
    default: -1,
    type: Number,
  })
  episodeNumber: number;
  @Prop({
    default: '',
    type: String,
  })
  introduce: string;
  @Prop({
    type: [ImageSchema],
  })
  images: Image[];
  @Prop({
    type: [DefinitionsSchema],
  })
  definitions: Definition[];
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
