import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateUtiliesDto {

    @IsNotEmpty()
    @IsString()
    initialdate: string; 

    @IsNotEmpty()
    @IsString()
    finaldate: string;
}
