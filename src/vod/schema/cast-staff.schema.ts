import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Image, ImageSchema } from './image.schema';

@Schema()
export class CastStaff extends Document {
  @Prop({
    default: '',
    type: String,
  })
  name: string;
  @Prop({
    type: [ImageSchema],
  })
  images: [Image];

  //1 演员 2 导演
  @Prop({
    default: -1,
    type: Number,
  })
  type: number;
}

export const CastStaffSchema = SchemaFactory.createForClass(CastStaff);
