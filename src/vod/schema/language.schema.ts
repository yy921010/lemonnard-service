import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Language extends Document {
  @Prop({
    default: '',
    type: String,
  })
  name: string;

  @Prop({
    type: [String],
    default: [],
  })
  vodIds: string[];
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
