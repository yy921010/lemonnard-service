import { Document, Schema as SchemaMongoose } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Genre extends Document {
  @Prop({
    default: -1,
    type: Number,
  })
  type: number;
  @Prop({
    default: '',
    type: String,
  })
  name: string;

  @Prop({
    type: [
      {
        type: SchemaMongoose.Types.ObjectId,
        ref: 'Vod',
      },
    ],
  })
  vodIds: string[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
