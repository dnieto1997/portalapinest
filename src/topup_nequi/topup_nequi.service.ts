import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTopupNequiDto } from './dto/create-topup_nequi.dto';
import { UpdateTopupNequiDto } from './dto/update-topup_nequi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfNequi } from 'src/conf_nequi/entities/conf_nequi.entity';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { ArrayTopup } from './dto/array.dto';
import { dateact } from 'src/helper/date.helper';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { nequiSaldo, nequiTopup } from 'src/helper/nequi-topup';
import { Callback } from 'src/callback/entities/callback.entity';
import { CallbackService } from 'src/callback/callback.service';
import { TopupNequi } from './entities/topup_nequi.entity';

@Injectable()

export class TopupNequiService {
  constructor(
    @InjectRepository(ConfNequi)
    private config_nequi: Repository<ConfNequi>,
    @InjectRepository(MovimientosColombia)
    private movementscol: Repository<MovimientosColombia>,
    @InjectRepository(Merchant)
    private aliados: Repository<Merchant>,
    @InjectRepository(TopupNequi)
    private topup: Repository<TopupNequi>,
    private readonly callbackService: CallbackService


  ) { }

  async findAll() {

    const toppay = await this.config_nequi.findOneBy({ uid: 1 })

    return toppay

  }
  async table(createtopup: CreateTopupNequiDto, response) {


    const { initialdate, finaldate } = createtopup

    const toppay = await this.config_nequi.findOneBy({ uid: 1 })

    let merchant = JSON.parse(toppay.aliados)

    const movements = await this.movementscol
      .createQueryBuilder('movimientos')
      .where('movimientos.merchant_id IN (:...merchant)', { merchant: merchant }) // Utiliza el parámetro aliado
      .andWhere('movimientos.status = :status', { status: 2 })
      .andWhere('movimientos.method = :method', { method: 'TUP_OUT' })
      .andWhere('movimientos.currency = :currency', { currency: 'COP' })
      .andWhere('movimientos.user_bank = :userBank', { userBank: 'NEQUI' })
      .andWhere('movimientos.type_transaction = :typeTransaction', { typeTransaction: 2 })
      .andWhere(`DATE(movimientos.created_at) BETWEEN '${initialdate}' AND '${finaldate}'`)
      .orderBy('movimientos.uid', 'DESC')
      .limit(10)
      .getMany();

       
       
    return movements

  }


  async save(createtopup: UpdateTopupNequiDto, response) {

    const exist = await this.config_nequi.findOneBy({ uid: 1 });


    if (!exist) {
      throw new HttpException('Id no existe', HttpStatus.CONFLICT);
    }
    const updateUser = await this.config_nequi.preload({
      uid: 1,
      ...UpdateTopupNequiDto
    });

    return await this.config_nequi.save(updateUser);

  }
  async recharge(uid, response) {
    const date = dateact
    const searchMov = await this.movementscol.findBy({ uid: uid })
    const searchUrl = await this.aliados.findBy({ uid: searchMov[0].merchant_id })
    const cost = Number(searchUrl[0].cashout);
    const iva = cost * searchUrl[0].iva;

    const array={
      reference:searchMov[0].reference,
      amount:Number(searchMov[0].amount),
      userdoc:searchMov[0].user_doc, 
      usernumaccount:searchMov[0].user_num_account,
      email:searchMov[0].user_email, 
      name:searchMov[0].user_name
    }

    const resp = await nequiTopup(searchMov[0].reference,Number(searchMov[0].amount),searchMov[0].user_doc,searchMov[0].user_num_account,searchMov[0].user_email,searchMov[0].user_name);
    const arrResp = JSON.parse(resp);

   if (arrResp.code == '01') {

      //ACTUALIZAR EL MOVIMIENTO 
      const Update = {
        status: 1,
        cost: cost,
        iva: iva,
        notify: 'E',
        updated_at: date
      }
      const updateMovimiento = await this.movementscol.preload({
        uid:searchMov[0].uid,
      ...Update
    });
    const saveMovimiento = await this.movementscol.save(updateMovimiento);
      const ActMov = await this.movementscol.save(Update)
       const requestBody = ({
        reference: searchMov[0].reference,
        status: 'success',
        method: 'TUP_OUT',
        amount: Number(searchMov[0].amount),
        currency: searchMov[0].currency,
        referenceid: searchMov[0].uid,
        url: searchUrl[0].url_response,
        name: searchUrl[0].merchant,
        uid: searchUrl[0].uid,
        user:response.id
        

      }); 
      const call = await this.callbackService.CallbackPayout(requestBody)
    let Rw1 = JSON.stringify({
        "reference": `${searchMov[0].reference}`,
        "status": 'success',
        "method": 'TUP_OUT',
        "amount": `${Number(searchMov[0].amount)}`,
        "currency": 'COP',
        "ErrSms": ``,
      });

      const saveintable = {
        respuesta: resp,
        date: date,
        reference: searchMov[0].reference,
        respmerchant: call,
        status: arrResp.code,
        request: Rw1
      }
      const save =  await this.topup.save(saveintable) 

      return {
        msg: arrResp.message,
        status: 1
      }


    }  else {

      if (arrResp.error == 'NO_BALANCE') {
        return ({
          result: [],
          msg: 'No tienes saldo disponible para esta operación, por favor comunícate con tu ejecutivo de cuenta',
          status: 1
        });
      } else if (arrResp.error == 'INTERNAL_ERROR') {
        return ({
          result: [],
          msg: arrResp.message,
          status: 1
        });

      } else {
        const searchMov = await this.movementscol.findOneBy({ uid: uid })
        const Update = {
          status: 3,
          cost: cost,
          iva: iva,
          notify: 'E',
          updated_at: date
        }

        const updateMovimiento = await this.movementscol.preload({
          uid:searchMov.uid,
        ...Update
      });
        const ActMov = await this.movementscol.save(updateMovimiento)
        const searchmerchant = await this.aliados.findBy({ uid: searchMov.merchant_id})
        if (arrResp.error == 'REFERENCE_INVALID' || arrResp.error == 'INVALID_DATA' || arrResp.error == 'INCOMPLETE_DATA') {
          
          const requestBody = ({
            reference: searchMov.reference,
            status: 'declined',
            method: 'TUP_OUT',
            amount: Number(searchMov.amount),
            currency: searchMov.currency,
            referenceid: searchMov.uid,
            url: searchUrl[0].url_response,
            name: searchUrl[0].merchant,
            uid: searchUrl[0].uid,
            motivo: arrResp.message,
            user:response.id,
            type:searchMov.type_transaction
           

          });

          const call = await this.callbackService.CallbackPayout(requestBody)

          //GUARDAR RESPUESTA EN LA TABLA nequi_topup 
          let Rw1 = JSON.stringify({
            "reference": `${searchMov.reference}`,
            "status": 'success',
            "method": 'TUP_OUT',
            "amount": `${Number(searchMov.amount)}`,
            "currency": 'COP',
            "ErrSms": ``,
          });

         const saveintable = {
          respuesta: resp,
          date: date,
          reference: searchMov.reference,
          respmerchant: call,
          status: arrResp.code,
          request: Rw1
          }


          const save = this.topup.save(saveintable) 
          return ({
            result: [],
            msg: arrResp.message,
            status: 1
          });
        }
      }
    } 

  }



  async rechargeall(array:ArrayTopup,response) {
    const date = dateact;
    let detenerBucle = false;
    const responses = [];


    for( let element of  array.array){

      const searchMov= await this.movementscol.findOneBy({uid:Number(element.uid)})
      const searchUrl= await this.aliados.findOneBy({uid:Number(searchMov.merchant_id)})
      const cost = Number(searchUrl.cashout)
      const iva = cost * searchUrl.iva

      const resp = await nequiTopup(searchMov.reference,Number(searchMov.amount),searchMov.user_doc,searchMov.user_num_account,searchMov.user_email,searchMov.user_name);
      const arrResp = JSON.parse(resp);
  
          
       if (arrResp.code == '01') {

        //ACTUALIZAR EL MOVIMIENTO 
        const Update = {
          status: 1,
          cost: cost,
          iva: iva,
          notify: 'E',
          updated_at: date
        }
        const updateMovimiento = await this.movementscol.preload({
          uid:searchMov.uid,
        ...Update
      });
      const saveMovimiento = await this.movementscol.save(updateMovimiento);
      console.log(saveMovimiento)
        const ActMov = await this.movementscol.save(Update)
         const requestBody = ({
          reference: searchMov.reference,
          status: 'success',
          method: 'TUP_OUT',
          amount: Number(searchMov.amount),
          currency: searchMov.currency,
          referenceid: searchMov.uid,
          url: searchUrl.url_response,
          name: searchUrl.merchant,
          uid: searchUrl.uid,
          user:response.id
          
  
        }); 
        const call = await this.callbackService.CallbackPayout(requestBody)
      let Rw1 = JSON.stringify({
          "reference": `${searchMov.reference}`,
          "status": 'success',
          "method": 'TUP_OUT',
          "amount": `${Number(searchMov.amount)}`,
          "currency": 'COP',
          "ErrSms": ``,
        });
  
        const saveintable = {
          respuesta: resp,
          date: date,
          reference: searchMov.reference,
          respmerchant: call,
          status: arrResp.code,
          request: Rw1
        }
        const save =  await this.topup.save(saveintable) 
  
        responses.push({
          msg: arrResp.message,
          status: 1
        });
  
  
      } else {
        if (arrResp.error == 'NO_BALANCE') {
          detenerBucle = true;
          break;
        
        } else if (arrResp.error == 'INTERNAL_ERROR') {
          console.log(arrResp.error);
  
        } else {
          const searchMov = await this.movementscol.findOneBy({uid:Number(element.uid)})
          const Update = {
            status: 3,
            cost: cost,
            iva: iva,
            notify: 'E',
            updated_at: date
          }
  
          const updateMovimiento = await this.movementscol.preload({
            uid:searchMov.uid,
          ...Update
        });
          const ActMov = await this.movementscol.save(updateMovimiento)
          const searchmerchant = await this.aliados.findOneBy({ uid: searchMov.merchant_id})
          if (arrResp.error == 'REFERENCE_INVALID' || arrResp.error == 'INVALID_DATA' || arrResp.error == 'INCOMPLETE_DATA') {
            
            const requestBody = ({
              reference: searchMov.reference,
              status: 'declined',
              method: 'TUP_OUT',
              amount: Number(searchMov.amount),
              currency: searchMov.currency,
              referenceid: searchMov.uid,
              url: searchUrl.url_response,
              name: searchUrl.merchant,
              uid: searchUrl.uid,
              motivo: arrResp.message,
              user:response.id,
              type:searchMov.type_transaction
            });
  
            const call = await this.callbackService.CallbackPayout(requestBody)
  
            //GUARDAR RESPUESTA EN LA TABLA nequi_topup 
            let Rw1 = JSON.stringify({
              "reference": `${searchMov.reference}`,
              "status": 'success',
              "method": 'TUP_OUT',
              "amount": `${Number(searchMov.amount)}`,
              "currency": 'COP',
              "ErrSms": ``,
            });
  
           const saveintable = {
            respuesta: resp,
            date: date,
            reference: searchMov.reference,
            respmerchant: call,
            status: arrResp.code,
            request: Rw1
            }
  
  
            const save = this.topup.save(saveintable) 
            return ({
              result: [],
              msg: arrResp.message,
              status: 1
            });
          }
        }
      }  


    }

    if (detenerBucle) {
      responses.push({
        result: [],
        msg: 'No tienes saldo disponible para esta operación, por favor comunícate con tu ejecutivo de cuenta',
        status: 1
      });
    } else {
      responses.push({
        result: [],
        msg: 'Proceso finalizado',
        status: 1
      });
    }
  
    return responses;

  }
    

  async history(createtopup: CreateTopupNequiDto, response) {


    const { initialdate, finaldate } = createtopup



    const movimientos = await this.movementscol
      .createQueryBuilder()
      .select([
        'n.reference',
        'n.respuesta',
        'n.respmerchant',
        'n.status',
        'm.status',
        'm.user_bank',
        'm.user_email',
        'm.user_num_account',
        'm.user_doc',
        'm.amount',
        'm.user_name',
        
      ])
      .from('logs_nequi_topup', 'n')
      .innerJoin('movimientoscol', 'm', 'm.reference = n.reference')
      .where(`DATE(n.date) BETWEEN '${initialdate}' AND '${finaldate}'`)
      .getMany();
     
          console.log(movimientos)
       
       
    return movimientos

  }
  async balance( response) {





    const resp = await nequiSaldo();
   
       
       
    return resp

  }
}
