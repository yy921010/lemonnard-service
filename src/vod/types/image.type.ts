import { IsNumber, IsString } from 'class-validator';
export class Image {
  _id?: string;
  @IsNumber()
  type: number;
  @IsString()
  href: string;
}
