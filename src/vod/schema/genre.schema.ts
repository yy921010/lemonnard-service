import { Document } from 'mongoose';
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
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
