import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from "class-validator";
export class CreateTrmDto {

    id:number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    currency: string;

}
