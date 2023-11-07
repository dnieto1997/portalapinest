import {  IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateDispersioneDto {
   
    id: number;
    
    @IsNotEmpty()
    @IsNumber()
    merchant: number; 

    @IsNotEmpty()
    @IsString()
    banco: string;

    @IsNotEmpty()
    @IsString()
    cuenta: string;
  

    @IsNotEmpty()
    @IsNumber()
    valor: number;

    
    @IsNotEmpty()
    @IsString()
    pais: string;


    
    @IsNotEmpty()
    @IsNumber()
    gmf: number;
  
    
    @IsNotEmpty()
    @IsString()
    tipo: string;



}
