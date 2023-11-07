
import { IsString, IsOptional,IsNotEmpty, IsNumber, isNumber } from 'class-validator';

export class filterPayout {
   
    @IsOptional()
    @IsString()
    reference: string; 

    @IsOptional()
    @IsString()
    document: string; 

    @IsOptional()
    @IsNumber()
    uid: number; 

    


}
