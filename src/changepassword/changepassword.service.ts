import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChangepasswordDto } from './dto/create-changepassword.dto';
import { UpdateChangepasswordDto } from './dto/update-changepassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDash } from 'src/login_dash/entities/login_dash.entity';
import { Repository } from 'typeorm';
import { hash,compare } from 'bcrypt';

@Injectable()
export class ChangepasswordService {
  constructor(
    @InjectRepository(LoginDash) private logiDashRepository:Repository<LoginDash>
  ){}

  create(createChangepasswordDto: CreateChangepasswordDto) {
    return 'This action adds a new changepassword';
  }

  findAll() {
    return `This action returns all changepassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} changepassword`;
  }

  async update(response, createChangepasswordDto: CreateChangepasswordDto) {
  
      const {pass,newpass}=createChangepasswordDto
      const {id}=response
      const search = await this.logiDashRepository.findOneBy({log_id:id})

      const isPasswordValid = await compare(pass,search.log_clave);
      
      const newpasscurrent= await hash(newpass, Number(process.env.HASH_SALT));

      if(!isPasswordValid){
        throw new HttpException('Password Error', HttpStatus.CONFLICT);
      }
      
      const passNew= await this.logiDashRepository.preload({
        log_id:id,
        log_clave:newpasscurrent
      })

     const save = this.logiDashRepository.save(passNew)

     return {
      "Message":"Password changed successfully"
     }

     

       
      

       

   
  }

  remove(id: number) {
    return `This action removes a #${id} changepassword`;
  }
}
