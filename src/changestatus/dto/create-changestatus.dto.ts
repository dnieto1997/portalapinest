import { IsIn, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateChangestatusDto {

    @IsNotEmpty()
    @IsString()
    country: string; 


    @IsNotEmpty()
    @IsNumber()
    status: number; 

    @IsNotEmpty()
    @IsString()
    @IsIn(['R', 'I'], { message: 'El campo tipo debe ser "R" o "I"' })
    type: string; 

}
