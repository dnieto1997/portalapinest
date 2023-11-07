import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from "class-validator";

export class CreateLoginDashDto {

    @IsNotEmpty()
    @IsString()
    log_merchantid: string;

    @IsNotEmpty()
    @IsString()
    log_usuario: string;

    @IsNotEmpty()
    @IsString()
    log_tipo: string;

    @IsNotEmpty()
    @IsNumber()
    cashout: number;

    @IsNotEmpty()
    @IsString()
    log_pais: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
   /*  @Matches(
        /(?:(?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, una letra minúscula y un número'
    }) */
    log_clave:string;

}
