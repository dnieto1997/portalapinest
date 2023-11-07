import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovimientosColombiaDto } from './dto/create-movimientos_colombia.dto';
import { UpdateMovimientosColombiaDto } from './dto/update-movimientos_colombia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimientosColombia } from './entities/movimientos_colombia.entity';
import { Repository } from 'typeorm';
import { MerchantService } from 'src/aliado/merchant.service';
import { Merchant } from 'src/aliado/entities/merchant.entity';

@Injectable()
export class MovimientosColombiaService {
  constructor(
    @InjectRepository(MovimientosColombia) 
    private MovimientosRepository: Repository<MovimientosColombia>,
    @InjectRepository(Merchant) private merchant:Repository<Merchant>,
){}

 async create(createMovimientosColombiaDto: CreateMovimientosColombiaDto,decode) {
    
       const {merchant}=decode
       console.log(merchant)
    const { reference } = createMovimientosColombiaDto;
    const refeFound = await this.MovimientosRepository.findOneBy({reference});
    const existId = await this.merchant.findOneBy({uid:merchant});

    console.log(existId)

    if(refeFound){
        return new HttpException(`The reference ${reference} is already created.`, HttpStatus.NOT_FOUND);
    }

    if( Number(createMovimientosColombiaDto.typetransaction) > 3 ){
        return new HttpException(`the type of transaction ${createMovimientosColombiaDto.typetransaction} is incorrect.`, HttpStatus.NOT_FOUND);
    }

  /*   const newReferencia = this.MovimientosRepository.create(
        {
            "reference": createMovimientosColombiaDto.reference,
            "expiration": createMovimientosColombiaDto.expiration,
            "currency": createMovimientosColombiaDto.currency,
            "amount": createMovimientosColombiaDto.amount,
            "user_doc": createMovimientosColombiaDto.numdoc,
            "user_name": createMovimientosColombiaDto.username,
            "user_phone": createMovimientosColombiaDto.userphone,
            "user_email": createMovimientosColombiaDto.useremail,
            "type_transaction": createMovimientosColombiaDto.typetransaction,
            "user_bank": createMovimientosColombiaDto.userbank,
            "user_type_account": createMovimientosColombiaDto.usertypeaccount,
            "user_num_account": createMovimientosColombiaDto.usernumaccount,
            "method": createMovimientosColombiaDto.method,
            "returnUrl":createMovimientosColombiaDto.return_url
        }
    );
    return this.MovimientosRepository.save(newReferencia);  */
  }


}
