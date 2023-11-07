
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreatePayoutDto {

    @IsNotEmpty()
    @IsString()
    fechainicio: string; 

    @IsNotEmpty()
    @IsString()
    fechafin: string;

    
    @IsOptional()
    @IsString()
    aliado: string; 


    @IsOptional()
    @IsString()
    user: string; 
}
