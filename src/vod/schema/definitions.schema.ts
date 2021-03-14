import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Definition extends Document {
  @Prop({
    default: '',
    type: String,
  })
  title: string;
  @Prop({
    default: -1,
    type: Number,
  })
  type: number;
  @Prop({
    default: '',
    type: String,
  })
  url: string;
}

export const DefinitionsSchema = SchemaFactory.createForClass(Definition);
