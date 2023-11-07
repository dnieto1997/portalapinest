import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty()
    @IsString()
    log_usuario: string;

    @IsNotEmpty()
    @IsString()
    log_clave:string;
    
}


