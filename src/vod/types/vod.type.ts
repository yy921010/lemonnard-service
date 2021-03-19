import { ValidateNested, IsNumber, IsString } from 'class-validator';
import { Image } from './image.type';
import { Genre } from './genre.type';
import { CastStaff } from './cast-staff.type';
import { Season } from './season.type';
import { Language } from './language.type';
export class Vod {
  _id?: string;
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
  @IsString()
  introduce: string;
  @IsString()
  time: string;
  @IsNumber()
  rating: number;
  @ValidateNested()
  images: Image[];
  @ValidateNested()
  language: Language[];
  @ValidateNested()
  genres: Genre[];
  @ValidateNested()
  castStaff: CastStaff[];
  @ValidateNested()
  seasons: Season[];
}
