import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) 
    private permission: Repository<Permission>,
    @InjectRepository(Merchant) 
    private aliados: Repository<Merchant>,
){}
  
 async findAll(response) {

  const {merchantid}=response
    const permission= await this.permission.find({order: {posicion: "ASC"}})

console.log(response)

    if(merchantid){
         const token = await this.aliados.findOneBy({uid:merchantid})
 
        return ({
          result:permission,
          type:response.log_tipo,
          user:response.user,
          country:response.countries,
          status:response.status,
          merchantid:response.merchantid,
          token:token.token
  
        })

    }else{
      return ({
        result:permission,
        type:response.log_tipo,
        user:response.user,
        country:response.countries,
        status:response.status,
      
      })

    }


   
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
