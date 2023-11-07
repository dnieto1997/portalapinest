import { IsString,IsNumber,IsNotEmpty, IsOptional } from "class-validator";
export class CreateMovimientosPeruDto {
    @IsNotEmpty()
    @IsString()
    reference: string;

    @IsNotEmpty()
    @IsString()
    expiration: Date;

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

    @IsNotEmpty()
    @IsNumber()
    merchant_id: number;

    @IsOptional()
    @IsString()
    return_url: string;
}
