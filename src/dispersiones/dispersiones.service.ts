import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDispersioneDto } from './dto/create-dispersione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispersione } from './entities/dispersione.entity';
import { Repository} from 'typeorm';
import { Banco } from 'src/bancos/entities/banco.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { Paise } from 'src/paises/entities/paise.entity';

@Injectable()
export class DispersionesService {
  constructor(
    @InjectRepository(Dispersione) private dispersion:Repository<Dispersione>,

  ){}
  async create(createDispersioneDto: CreateDispersioneDto) {


    const newUser = this.dispersion.create(createDispersioneDto);
    const saveUser =  await this.dispersion.save(newUser);
    
    
    return saveUser;
  }

 async findAll() {

  return "resultQuery";
  }

 async findOne(id: number) {
    const existUser = await this.dispersion.findOneBy({id:id});

    if(!existUser){
      throw new HttpException('Dispersion does not exist', HttpStatus.CONFLICT);
    }
  }

  
 async verdispersion(response,country) {


  const { log_tipo, merchant_id } = response
  const results = await this.dispersion
  .createQueryBuilder('d')
  .select([
    'd.*',
    'aliado.merchant AS nomaliado',
    'CASE WHEN d.banco REGEXP \'^[0-9]\' = 0 THEN d.banco ELSE bancos.nombre END AS bancoaliado',
    'CASE WHEN d.tipo = "S" THEN "SALIDA" ELSE "ENTRADA" END AS tipoaliado',
    'paises.nombre AS paisn',
  ])
  .leftJoin(Merchant, 'aliado', 'aliado.uid = d.merchant')
  .leftJoin(Banco, 'bancos', 'bancos.id = d.banco')
  .innerJoin(Paise, 'paises', 'paises.uid = d.pais')
  .where('d.estado = :status', { status: 1 })

  
  .andWhere('paises.uid = :country', { country: country })
  .getRawMany();


  return results
  
  

}


 
}
