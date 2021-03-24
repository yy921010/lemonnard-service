import { IsString } from 'class-validator';
export class Language {
  @IsString()
  name: string;
  id?: string;
}
