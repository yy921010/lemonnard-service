import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Image } from './image.type';
import { Definition } from './definition.type';
export class Episode {
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
  @ValidateNested()
  definitions: Definition[];
}
