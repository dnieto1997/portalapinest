import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, Allow } from 'class-validator';

export class ArrayPayoutItem2 {
  @IsString()
  reference: string;

  @IsString()
  status: string | number;

  @IsString()
  motivo: string;

  @IsString()
  currency: string;

  
  @IsString()
  amount: string;
  @IsString()
  url_response: string;

}

export class ArrayPayout2 {
  @IsArray()
  @Type(() => ArrayPayoutItem2) // Usa Type para deserializar los objetos dentro del array
  array: ArrayPayoutItem2[];
}
