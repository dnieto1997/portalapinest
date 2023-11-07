import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, Allow } from 'class-validator';

export class ArrayPayoutItem {
  @IsString()
  reference: string;

  @IsString()
  status: string | number;

  @IsString()
  motivo: string;

  @IsString()
  provider: string;

}

export class ArrayPayout {
  @IsArray()
  @Type(() => ArrayPayoutItem) // Usa Type para deserializar los objetos dentro del array
  array: ArrayPayoutItem[];
}
