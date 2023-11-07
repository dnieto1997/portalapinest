import { IsString,IsNumber,IsNotEmpty,MinLength, IsOptional } from "class-validator";
export class CreateMovimientosColombiaDto {
    @IsNotEmpty()
    @IsString()
    reference: string;

    @IsNotEmpty()
    @IsString()
    expiration: String;

    @IsNotEmpty()
    @IsString()
    currency: string;

    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    numdoc: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    userphone: string;

    @IsString()
    useremail?: string;

    @IsNotEmpty()
    @IsString()
    typetransaction: string;

    @IsString()
    userbank?: string;

    @IsString()
    usertypeaccount?: string;

    @IsString()
    usernumaccount?: string;

    @IsNotEmpty()
    @IsString()
    method: string;


    @IsOptional()
    @IsString()
    return_url: string;

}
