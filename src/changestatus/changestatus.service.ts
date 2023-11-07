import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChangestatusDto } from './dto/create-changestatus.dto';
import { UpdateChangestatusDto } from './dto/update-changestatus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { Repository } from 'typeorm';
import { Masiva } from 'src/masiva/entities/masiva.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { CallbackService } from 'src/callback/callback.service';


@Injectable()
export class ChangestatusService {
  constructor(
    @InjectRepository(MovimientosColombia) 
    private movimientoscol: Repository<MovimientosColombia>,
    @InjectRepository(Masiva) 
    private masiva: Repository<Masiva>,
    @InjectRepository(MovimientosPeru) private MovimientosRepositoryper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) private MovimientosRepositorymxt: Repository<MovimientosMexico>,
    @InjectRepository(Merchant) 
    private merchant: Repository<Merchant>,
    private readonly callbackService: CallbackService
){}
  create(createChangestatusDto: CreateChangestatusDto) {
    return 'This action adds a new changestatus';
  }

  findAll() {
    return `This action returns all changestatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} changestatus`;
  }

  async uid(createChangestatusDto: CreateChangestatusDto,variable,response) {
      
    const {country,status,type} = createChangestatusDto;

    let sqlWhere:any;
    let errorResult = "";
    let updateResult = "";

    const selectedRepository =
    country === 'PEN' ? this.MovimientosRepositoryper :
    country === 'MXT' ? this.MovimientosRepositorymxt :
     this.movimientoscol

     if(type == "I"){
      sqlWhere = {uid:variable};
      errorResult = "UID";
      updateResult ="uid = :uid";
     }else if(type == "R"){
      sqlWhere = {reference:variable};
      errorResult = "REFERENCIA";
      updateResult ="reference = :reference";
     }

    const sql = await selectedRepository.findOneBy(sqlWhere);

    if(!sql){
      throw new HttpException(`${errorResult} Not exist`, HttpStatus.CONFLICT);
    }

     

    const update = await selectedRepository.preload({
        uid:sql.uid,
        status:status
    });
    const save = await selectedRepository.save(update);

    const updateData = {
      status: status,
      notify:'E',
      updated_at: sql.created_at
    };


    await selectedRepository
    .createQueryBuilder()
    .update()
    .set(updateData)
    .where(updateResult,sqlWhere )
    .execute();

    const aliados = await this.merchant.findOneBy({ uid:sql.merchant_id});
    
    let statusby=""

    if (status == 1) {
      statusby = "success";
    } else if (status == 3) {
      statusby = "declined";
    }

    const requestBody =  {
      reference: sql.reference,
      status: statusby,
      method: sql.method,
      amount: sql.amount,
      currency: sql.currency,
      referenceid:sql.uid,
      url:aliados.url_response,
      name:aliados.merchant,
      uid:aliados.uid,
      type: sql.type_transaction,
      user: response.id
      
    };
  

    const llamar = await this.callbackService.Callback(requestBody)
   
       
      if (llamar) {
      return {message:` Successfully changede`,status: 1}
    }else{
      return {
        message: {result:`Error changing state`},
        status: 1,
      };
    } 
          


 

    }




 

  remove(id: number) {
    return `This action removes a #${id} changestatus`;
  }
}
