import { PartialType } from '@nestjs/swagger';
import { CreatePayoutDto } from './create-payout.dto';
import { IsString,IsNumber,IsNotEmpty,MinLength, IsOptional } from "class-validator";

export class UpdatePayoutDto extends PartialType(CreatePayoutDto) {

    @IsOptional()
    @IsString()
    motivo: string;
}
