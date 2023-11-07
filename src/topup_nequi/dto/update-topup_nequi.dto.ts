
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { CreateTopupNequiDto } from './create-topup_nequi.dto';
import { IsArray, IsString, IsOptional, Allow, IsNumber } from 'class-validator';

export class UpdateTopupNequiDto extends PartialType(CreateTopupNequiDto) {
    @IsString()
    merchants: string;
  
    @IsNumber()
    amount: string | number;
  
   

}
