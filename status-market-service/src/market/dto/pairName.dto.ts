import { IsString, Length } from 'class-validator';

export class PairNameDTO {
  @Length(3, 3)
  @IsString()
  from: string;

  @Length(3, 3)
  @IsString()
  to: string;
}
