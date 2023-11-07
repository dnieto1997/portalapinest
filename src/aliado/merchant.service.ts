import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAliadoDto } from './dto/create-aliado.dto';
import { UpdateAliadoDto } from './dto/update-aliado.dto';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MerchantService {

  constructor(
    @InjectRepository(Merchant) private merchant:Repository<Merchant>,
    private readonly jwtService: JwtService,
  ){}

  async create(createAliadoDto: CreateAliadoDto) {
    
      const {merchant,email,country} = createAliadoDto
      const existId = await this.merchant.findOneBy({merchant:merchant});
      if(existId){
        throw new HttpException('User does not exist', HttpStatus.CONFLICT);
      }
    
      const newUser = this.merchant.create(createAliadoDto);
      const saveUser =  await this.merchant.save(newUser);
      
      
      const token = this.jwtService.sign({ id: saveUser.uid });
         
  
      let pse_porcentaje = 0;
      let cashout = 0;
      let iva = 0;   
            

      if(country==1){
        pse_porcentaje = 0.80;
        cashout = 5000;
        iva = 0.19;
      }else if(country){
        pse_porcentaje = 3.00;
        cashout = 3.80;
        iva = 0.18;
      }
     
      const updateUser = await this.merchant.preload({
        uid: saveUser.uid,
        token: token,
        pse_porcentaje,
        cashout,
        iva

      });
  
      const saveUser2 = await this.merchant.save(updateUser);

      return saveUser2;
  }

  async findAll() {
    const user = await this.merchant.find();

    const usersConPaisColombia = user.map(user => {
      if (user.country === 1) {
        return { ...user, countryname:'Colombia' };
      }else if(user.country===2){
        return { ...user, countryname: 'Peru' };
      } else if(user.country===3){
        return { ...user, countryname: 'Mexico' };
      }
  
    });

    return usersConPaisColombia;
  }

  async findOne(id: number) {
    const existUser = await this.merchant.findOneBy({uid:id});

    if(!existUser){
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    return existUser;

  }

  async update(id: number, updateAliadoDto: UpdateAliadoDto) {
    const existUser = await this.merchant.findOneBy({uid:id});

    if(!existUser){
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

       const updateUser = await this.merchant.preload({
      uid:id,
      ...updateAliadoDto
    });
    return await this.merchant.save(updateUser);
  }



  async remove(id: number) {
    const existUser = await this.merchant.findOneBy({uid:id});

    if(!existUser){
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    let status = 1;

    if(existUser.status == 1){
      status = 2;
    }else{
      status = 1;
    }
    const updateUser = await this.merchant.preload({
      uid:id,
      status: status
    });

    return await this.merchant.save(updateUser);
  }
  async country(country){
   

    let pais=0
    if(country=='COP'){
      pais=1
    } else if(country=='PEN'){
      pais=2
    } else if(country=='MXN' ){
      pais=3
    }
  

    const existUser = await this.merchant.findBy({country:pais});
    if(!existUser){
      throw new HttpException('Usuario no existe', HttpStatus.CONFLICT);
    }
    return existUser;

}


async profile (response,country){
  let countryby=0
  if(country=='COP'){
    countryby=1
  } else if(country=='PEN'){
    countryby=2
  } else if(country=='MXN' ){
    countryby=3
  }

    if(response.log_tipo=='MA'){
      const existUser = await this.merchant.findBy({country:countryby});

      if(existUser.length==0){
        return ({
          message:"There are no registered allies in this country"
        })
      }

      return existUser
        
    }else{
      const existUser = await this.merchant.findBy({uid:response.merchantid});     
      
      return existUser
    }
    

}



  }

