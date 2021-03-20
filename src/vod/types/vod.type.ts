import { ValidateNested, IsNumber, IsString } from 'class-validator';
import { Image } from './image.type';
import { Genre } from './genre.type';
import { CastStaff } from './cast-staff.type';
import { Season } from './season.type';
import { Language } from './language.type';
import { PlaySource } from './play-sources.type';
export class Vod {
  _id?: string;
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
  @IsString()
  originTitle: string;
  @IsString()
  introduce: string;
  @IsString()
  year: string;
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
  @ValidateNested()
  playSources: PlaySource[];
}
