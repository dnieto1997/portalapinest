import { Injectable } from '@nestjs/common';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { ArrayBlacklist } from './dto/array-blacklist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from './entities/blacklist.entity';
import { Repository } from 'typeorm';
import { dateact } from 'src/helper/date.helper';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist) 
    private blacklist: Repository<Blacklist>,
){}
 async import(array: ArrayBlacklist,request) {
    
    const {array:newarray}=array

      const arraycounet = newarray.length

      if(arraycounet==0){
        return ({
          msg: 'Select an xlxs file',
          arr:arraycounet,
          alert: 2
      });
      }

      const list = await this.blacklist.find()

      const result = newarray.map( (mv)=>{
        const repeated = list.filter( (rp)=>{
            if( rp.num_doc == mv.userdoc ){
                
                return rp.num_doc == mv.userdoc
            }
        })[0]

        let varRepeated = 'NO';

        if(repeated){
          varRepeated = 'SI';
        }
       
        return {
            eliminar: varRepeated,
            id: mv.id,
            Aliado: mv.aliado,
            username: mv.username,
            useremail: mv.useremail,
            reference: mv.reference,
            userdoc: mv.userdoc,
            userphone: mv.userphone,
            method: mv.method,
            date: mv.date,
            amount: mv.amount,
            currency: mv.currency,
            userbank: mv.userbank,
            usertypeaccount: mv.usertypeaccount,
            usernumaccount: mv.usernumaccount,
            cost: mv.cost,
            iva: mv.iva,
            status: mv.status,
            motivo: mv.motivo,
        }

    });

    return ({
        result: result,
        status: 1,
        msg:'Successful Verification',
        alerta:1
    }); 



  }

 async findAll() {
    const list = await this.blacklist.find()
    return list
  }

  async create(create: CreateBlacklistDto) {
       
       const {num_doc}=create
       const date=dateact

       const data={
        num_doc:String(num_doc),
        date:String(date)
       }

       const list = await this.blacklist.save(data)
       return ({
        result: list,
        status: 1,
        msg:'Successful Creation',
        alerta:1
    }); 

  }

 
  async update(create: CreateBlacklistDto,response,id:number) {
      
    const {num_doc}=create

    const date=dateact

    const list = await this.blacklist.findBy({id:id})
    
    if( list.length == 0){
      return ({
          msg: 'NumDoc does not exist '+ num_doc,
          alerta:2,
      })
  }
  const updateUser = await this.blacklist.preload({
    id:id,
    num_doc:num_doc,
    date:date
  });

  const save = await this.blacklist.save(updateUser)
  console.log(save)


 return save




     

  }

 
}
