import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, Allow } from 'class-validator';

export class ArrayPayinItem2 {
  @IsString()
  reference: string;

  @IsString()
  status: string | number;

  
  @IsString()
  method: string;


  @IsString()
  currency: string;

  
  @IsString()
  amount: string;
  @IsString()
  url_response: string;

}

export class ArrayPayin2 {
  @IsArray()
  @Type(() => ArrayPayinItem2) // Usa Type para deserializar los objetos dentro del array
  array: ArrayPayinItem2[];
}
