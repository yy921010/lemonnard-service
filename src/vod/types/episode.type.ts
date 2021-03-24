import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Image } from './image.type';
export class Episode {
  id?: string;
  @IsString()
  title: string;
  @IsString()
  playDuration: string;
  @IsNumber()
  episodeNumber: number;
  @IsString()
  introduce: string;
  @ValidateNested()
  images: Image[];
}
