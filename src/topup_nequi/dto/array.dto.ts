import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, Allow, IsNumber } from 'class-validator';

export class ArraytopupItem {
  
    @IsString()
  uid: string;

  @IsString()
  merchant: string | number;

  @IsString()
  reference: string;

  @IsString()
  bank: string;

  
  @IsString()
  method: string;

    
  @IsString()
  numdoc: string;

  @IsString()
  name: string;

  
  @IsNumber()
  amount: number;

  @IsString()
  email: string;

}

export class ArrayTopup {
  @IsArray()
  @Type(() => ArraytopupItem) 
  array: ArraytopupItem[];
}
