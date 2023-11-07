

import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';



export class CreateAliadoDto {


    @IsNotEmpty()
    @IsString()
    merchant: string;
  
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @IsNotEmpty()
    @IsNumber()
    country: number;

    @IsOptional()
    @IsString()
    token?: string;


      

}
