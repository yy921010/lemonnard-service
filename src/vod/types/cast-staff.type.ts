import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Image } from './image.type';
export class CastStaff {
  _id?: string;
  @IsString()
  name: string;
  @IsString()
  introduce: string;
  @ValidateNested()
  images: Image[];
  @IsNumber()
  type: number;
}
