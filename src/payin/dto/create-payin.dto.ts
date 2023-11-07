import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePayinDto {
    @IsNotEmpty()
    @IsString()
    initialdate: string; 

    @IsNotEmpty()
    @IsString()
    finaldate: string;

    
    @IsOptional()
    @IsString()
    user: string; 


    @IsOptional()
    @IsString()
    reference: string; 

    
    @IsOptional()
    @IsString()
    merchant: string; 

    @IsOptional()
    @IsString()
    status: string; 

}
