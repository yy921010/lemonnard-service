import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({
    default: -1,
    type: Number,
  })
  type: number;
  @Prop({
    default: '',
    type: String,
  })
  href: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
