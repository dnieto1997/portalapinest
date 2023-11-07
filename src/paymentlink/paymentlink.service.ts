import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentlinkDto } from './dto/create-paymentlink.dto';
import { UpdatePaymentlinkDto } from './dto/update-paymentlink.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { dateact } from 'src/helper/date.helper';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { JwtService } from '@nestjs/jwt';
import { Config } from 'src/config/entities/config.entity';

@Injectable()
export class PaymentlinkService {
  constructor(
    @InjectRepository(Merchant) private merchant:Repository<Merchant>,
    @InjectRepository(MovimientosColombia) private movimientoscol:Repository<MovimientosColombia>,
    @InjectRepository(MovimientosPeru) private MovimientosRepositoryper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) private MovimientosRepositorymxt: Repository<MovimientosMexico>,
    @InjectRepository(Config) private config: Repository<Config>,
    private jwtService: JwtService

  ){}
  async create(createTransaccionDto: CreatePaymentlinkDto) {

      
    const {reference,expiration,currency,amount,numdoc,username,userphone,useremail,typetransaction,userbank,usertypeaccount,usernumaccount,method,return_url,merchant_id}= createTransaccionDto
     

    const selectedRepository =
    currency === 'PEN' ? this.MovimientosRepositoryper :
    currency === 'MXT' ? this.MovimientosRepositorymxt :
          this.movimientoscol   

    const merchant = await this.merchant.findOneBy({uid:merchant_id});

    if(merchant===null){
      return ({
        'message': 'Comercio no Existe Verifica'
      }
       
     );
    }else{
      const referenceexists = await selectedRepository.findOneBy({reference:reference}); 

     if(referenceexists){
      throw new HttpException(`La referencia ${reference} ya existe`, HttpStatus.FORBIDDEN);
    
     }else{
      
      if(amount>String(20000000000)){
        throw new HttpException('Monto de la transacción es demasiado grande',HttpStatus.FORBIDDEN);
      }
      const updateUser =({
        reference: reference,
        merchant_id:merchant.uid,
        merchant_name:merchant.merchant,
        merchant_email:merchant.email,
        merchant_phone:merchant.phone,
        merchant_logo:merchant.image,
        expiration:expiration,
        currency:currency,
        amount:amount,
        user_doc:numdoc,
        user_name:username,
        user_phone:userphone,
        user_email:useremail,
        type_transaction:typetransaction,
        method:method,
        user_bank:userbank,
        user_type_account:usertypeaccount,
        user_num_account:usernumaccount,
        status:2,
        created_at:dateact,
        returnUrl:return_url
      });

      const save = await selectedRepository.save(updateUser);
      const {uid}=save
       const searchconfig= await this.config.findOneBy({type:'domain'}) 
       const {name}=searchconfig

      const token = this.jwtService.sign({ uid });
       
      const urlCheckout =  `${name}/form/#/?token=${token}`;

      const user2 = await this.movimientoscol.preload({
        uid:uid,
        checkout:urlCheckout,
        created_at:dateact,
        updated_at:dateact
      })
      
      const saveuser= await this.movimientoscol.save(user2)
   return ({
    'data' : {
      'checkout' : urlCheckout
     }
     
   });



      
     }


    }

    

  }

  findAll() {
    return `This action returns all paymentlink`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentlink`;
  }

  update(id: number, updatePaymentlinkDto: UpdatePaymentlinkDto) {
    return `This action updates a #${id} paymentlink`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentlink`;
  }
}
