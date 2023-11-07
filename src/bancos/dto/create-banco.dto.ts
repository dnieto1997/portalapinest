
import {  IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateBancoDto {
    id: number;
    @IsNotEmpty()
    @IsString()
    nombre: string;
  
    @IsNotEmpty()
    @IsString()
    cuenta: string;
  
    @IsNotEmpty()
    @IsNumber()
    merchant: number;
  



}
