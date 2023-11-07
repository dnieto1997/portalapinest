import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, Allow, isNotEmpty, ValidateNested } from 'class-validator';



export class ArrayComparar {
  @IsArray()
  @IsString({ each: true }) // Valida que cada elemento en el array sea una cadena
  reference: string[];
}
