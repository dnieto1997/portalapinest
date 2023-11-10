import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, Allow } from 'class-validator';

export class ArrayPayinItem {
  @IsString()
  reference: string;

  @IsString()
  status: string | number;



}

export class ArrayPayin {
  @IsArray()
  @Type(() => ArrayPayinItem) // Usa Type para deserializar los objetos dentro del array
  array: ArrayPayinItem[];
}
