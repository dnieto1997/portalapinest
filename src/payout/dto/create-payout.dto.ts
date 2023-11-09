
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreatePayoutDto {

    @IsNotEmpty()
    @IsString()
    initialdate: string; 

    @IsNotEmpty()
    @IsString()
    finaldate: string;

    
    @IsOptional()
    @IsString()
    aliado: string; 


    @IsOptional()
    @IsString()
    user: string; 
}
