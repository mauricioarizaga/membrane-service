import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length, Min } from 'class-validator';

export class PairNameDTO {
  @Length(3, 3)
  @IsString()
  from: string;

  @Length(3, 3)
  @IsString()
  to: string;
}

export class BuySellDTO extends PartialType(PairNameDTO) {
  @IsString()
  operationType: string;

  @Min(0)
  amount: number;

  @Min(0)
  limitPrice: number;
}
