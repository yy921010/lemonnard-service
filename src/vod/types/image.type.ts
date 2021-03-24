import { IsNumber, IsString } from 'class-validator';
export class Image {
  id?: string;
  @IsNumber()
  type: number;
  @IsString()
  href: string;
}
