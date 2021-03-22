import { IsString, ValidateNested } from 'class-validator';
import { Episode } from './Episode.type';
export class Season {
  id?: string;
  @IsString()
  title: string;
  @IsString()
  introduce: string;
  @ValidateNested()
  episodes: Episode[];
}
