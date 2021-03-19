import { IsNumber, IsString } from 'class-validator';
export class Genre {
  _id?: string;
  @IsNumber()
  type: number;
  @IsString()
  name: string;
}
