import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovimientosMexicoDto } from './dto/create-movimientos_mexico.dto';
import { UpdateMovimientosMexicoDto } from './dto/update-movimientos_mexico.dto';
import { MovimientosMexico } from './entities/movimientos_mexico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MerchantService } from 'src/aliado/merchant.service';

@Injectable()
export class MovimientosMexicoService {
  constructor(
    @InjectRepository(MovimientosMexico) 
    private MovimientosRepository: Repository<MovimientosMexico>,
    private readonly aliadosService: MerchantService,
){}
 async create(movimientos: CreateMovimientosMexicoDto) {

    const { reference } = movimientos;
    const refeFound = await this.MovimientosRepository.findOneBy({reference});

    if(refeFound){
        return new HttpException(`The reference ${reference} is already created.`, HttpStatus.NOT_FOUND);
    }

    if( Number(movimientos.typetransaction) > 3 ){
        return new HttpException(`the type of transaction ${movimientos.typetransaction} is incorrect.`, HttpStatus.NOT_FOUND);
    }

    const newReferencia = this.MovimientosRepository.create(
        {
            "reference": movimientos.reference,
            "expiration": movimientos.expiration,
            "currency": movimientos.currency,
            "amount": movimientos.amount,
            "user_doc": movimientos.numdoc,
            "user_name": movimientos.username,
            "user_phone": movimientos.userphone,
            "user_email": movimientos.useremail,
            "type_transaction": movimientos.typetransaction,
            "user_bank": movimientos.userbank,
            "user_type_account": movimientos.usertypeaccount,
            "user_num_account": movimientos.usernumaccount,
            "method": movimientos.method,
            "returnUrl":movimientos.return_url
        }
    );
    return this.MovimientosRepository.save(newReferencia);
  }

 
}
