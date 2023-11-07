import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, Allow } from 'class-validator';

export class ArrayBlacklistItem {
  @IsString()
  id: string;

  @IsString()
  aliado: string | number;

  @IsString()
  username: string;

  @IsString()
  useremail: string;
  @IsString()
  reference: string;

  @IsString()
  userdoc: string | number;

  @IsString()
  userphone: string;

  @IsString()
  method: string;
  @IsString()
  date: string;

  @IsString()
  amount: string | number;

  @IsString()
  currency: string;

  @IsString()
  userbank: string;


  @IsString()
  usertypeaccount: string;
  @IsString()
  usernumaccount: string;

  @IsString()
  cost: string | number;

  @IsString()
  iva: string;

  @IsString()
  status: string;

  @IsString()
  motivo: string;
}

export class ArrayBlacklist {
  @IsArray()
  @Type(() => ArrayBlacklistItem) // Usa Type para deserializar los objetos dentro del array
  array: ArrayBlacklistItem[];
}
