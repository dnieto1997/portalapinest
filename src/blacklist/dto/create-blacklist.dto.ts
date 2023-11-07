import { Type } from 'class-transformer';
import { IsArray, IsString, Allow, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateBlacklistDto {
    @IsNotEmpty()
    @IsString()
    num_doc:  string;
}
