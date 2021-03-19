import { IsString } from 'class-validator';
export class Definition {
  _id?: string;
  @IsString()
  title: string;
  @IsString()
  url: string;
}
