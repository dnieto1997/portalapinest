

import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTopupNequiDto {
    @IsNotEmpty()
    @IsString()
    initialdate: string; 

    @IsNotEmpty()
    @IsString()
    finaldate: string;

}
