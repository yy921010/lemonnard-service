import { IsNumber, IsString } from 'class-validator';
export class PlaySource {
  id?: string;
  @IsNumber()
  type: number;
  @IsString()
  quality?: string;
  @IsString()
  comment: string;
  @IsString()
  url: string;
  @IsNumber()
  duration?: number;
}
