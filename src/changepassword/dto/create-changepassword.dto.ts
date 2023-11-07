
import { IsString,IsNumber,IsNotEmpty,MinLength, IsOptional } from "class-validator";
export class CreateChangepasswordDto {

    @IsNotEmpty()
    @IsString()
    pass: string;

    @IsNotEmpty()
    @IsString()
    newpass: string;



}
