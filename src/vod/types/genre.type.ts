import { IsNumber, IsString } from 'class-validator';
export class Genre {
  id?: string;
  @IsNumber()
  type: number;
  @IsString()
  name: string;
}
