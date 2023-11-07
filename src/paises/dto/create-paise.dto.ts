import {  IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class CreatePaiseDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

}
