import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export class Vod extends Document {
  title: string;
  subtitle: string;
}

export const VodSchema = SchemaFactory.createForClass(Vod);
