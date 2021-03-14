import { Episode, EpisodeSchema } from './episode.schema';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Season extends Document {
  @Prop({
    type: String,
    default: '',
  })
  title: string;
  @Prop({
    default: '',
    type: String,
  })
  introduce: string;
  @Prop({
    type: [EpisodeSchema],
  })
  episodes: Episode[];
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
