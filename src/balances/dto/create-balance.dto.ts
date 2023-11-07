import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateBalanceDto {
    

    @IsOptional()
    @IsNumber()
    merchant: number; 


    @IsNotEmpty()
    @IsString()
    initialdate: string; 

    @IsNotEmpty()
    @IsString()
    finaldate: string;
}
