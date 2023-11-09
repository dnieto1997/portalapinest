
import { IsString, IsOptional,IsNotEmpty, IsNumber } from 'class-validator';

export class SuccessPayout {
    @IsNotEmpty()
    @IsString()
    initialdate: string; 

    @IsNotEmpty()
    @IsString()
    finaldate: string;

    @IsOptional()
    @IsNumber()
    status:  number;

    
    @IsOptional()
    @IsString()
    aliado: string; 

}
