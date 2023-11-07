
import { IsString, IsOptional,IsNotEmpty, IsNumber, isNumber } from 'class-validator';

export class PayoutPeru {
   
    @IsNotEmpty()
    @IsString()
    reference: string; 

    @IsNotEmpty()
    @IsNumber()
    amount: number; 

    @IsNotEmpty()
    @IsString()
    method: string; 

    


}
