
import { IsString, IsOptional,IsNotEmpty, IsNumber } from 'class-validator';

export class SuccessPayout {
    @IsNotEmpty()
    @IsString()
    fechainicio: string; 

    @IsNotEmpty()
    @IsString()
    fechafin: string;

    @IsOptional()
    @IsNumber()
    status:  number;

    
    @IsOptional()
    @IsString()
    aliado: string; 

}
