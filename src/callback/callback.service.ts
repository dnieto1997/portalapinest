import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsCallback } from 'src/logs_callback/entities/logs_callback.entity';
import { dateact } from 'src/helper/date.helper';

@Injectable()
export class CallbackService {

  constructor(
    @InjectRepository(LogsCallback)
    private logs_callback: Repository<LogsCallback>,
  ) { }

 Callback = async (array) => {
       const date= dateact
       console.log(array)
    const requestBody = JSON.stringify({
          
        reference: array.reference,
        status: array.status,
        method: array.method,
        amount: array.amount,
        currency: array.currency,
        referenceid:array.referenceid
      });
  
       const {url}=array

         
      const requestOptions: RequestInit = { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
        redirect: 'follow',
      };

    
      try {
        const response = await fetch(url, requestOptions); 
  
        if (response.ok) {
          const result = await response.text();
              
          const newReferencia =
            {
             reference:array.reference,
             referenceid:array.referenceid,
             amount:array.amount,
             date_notify:date,
             currency:array.currency,
             url_callback:url,
             json:requestBody,
             status:array.status,
             method:array.method,
             resp_callback:result,
             merchant_id: array.uid,
             merchant_name: array.name,
             type_transaction: array.type,
             user_created: array.user

            }
        

 

        await this.logs_callback.save(newReferencia);
             
       

          return result;



        } else {
          console.error('Network error:', response.status, response.statusText);
          throw new Error('An error occurred while submitting the request.');
        }
      } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while submitting the request.');
      }
    


 
}


CallbackPayout = async (array) => {
    
    const date= dateact
    const requestBody = JSON.stringify({
       
        reference: array.reference,
        status: array.status,
        method: array.method,
        amount: array.amount,
        currency: array.currency,
        errorMsg:array.motivo
      });
  
       const {url}=array
      const requestOptions: RequestInit = { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
        redirect: 'follow',
      };

            try {
        const response = await fetch(url, requestOptions); 
  
        if (response.ok) {
          const result = await response.text();
                
          const newReferencia =
            {
             reference:array.reference,
             referenceid:array.referenceid,
             amount:array.amount,
             date_notify:date,
             currency:array.currency,
             url_callback:url,
             json:requestBody,
             status:array.status,
             motivo:array.motivo,
             method:array.method,
             resp_callback:result,
             merchant_id: array.uid,
             merchant_name: array.name,
             type_transaction: array.type,
             user_created: array.user

            }
        

 

        await this.logs_callback.save(newReferencia);
       
          
          return result;



        } else {
          console.error('Network error:', response.status, response.statusText);
          throw new Error('An error occurred while submitting the request.');
        }
      } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while submitting the request.');
      }


      
}

CallbackPeru = async (array) => {
    
    const date=dateact
  const requestBody = JSON.stringify({
      reference: array.reference,
      status: array.status,
      method: array.method,
      amount: array.amount,
      referenceid:array.referenceid
    });

     const {url}=array
    const requestOptions: RequestInit = { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
      redirect: 'follow',
    };

    try {
      const response = await fetch(url, requestOptions); 

      if (response.ok) {
        const result = await response.text();
             
        const newReferencia =
        {
         reference:array.reference,
         referenceid:array.referenceid,
         amount:array.amount,
         date_notify:date,
         currency:array.currency,
         url_callback:url,
         json:requestBody,
         status:array.status,
         method:array.method,
         resp_callback:result,
         merchant_id: array.uid,
         merchant_name: array.name,
         type_transaction: array.type,
         user_created: array.user

        }
    



    await this.logs_callback.save(newReferencia);
        
        return result;



      } else {
        console.error('Network error:', response.status, response.statusText);
        throw new Error('An error occurred while submitting the request..');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while submitting the request..');
    }

}

CallbackPeruDeclined = async (array) => {
    
    const date=dateact





  const requestBody = JSON.stringify({
      reference: array.reference,
      status: array.status,
      method: array.method,
      amount: array.amount,
      referenceid:array.referenceid,
      errorMsg:array.motivo
    });

     const {url}=array
    const requestOptions: RequestInit = { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
      redirect: 'follow',
    };

    try {
      const response = await fetch(url, requestOptions); 

      if (response.ok) {
        const result = await response.text();
              
        const newReferencia =
        {
         reference:array.reference,
         referenceid:array.referenceid,
         amount:array.amount,
         date_notify:date,
         currency:array.currency,
         url_callback:url,
         json:requestBody,
         status:array.status,
         method:array.method,
         resp_callback:result,
         merchant_id: array.uid,
         merchant_name: array.name,
         type_transaction: array.type,
         user_created: array.user

        }
    



    await this.logs_callback.save(newReferencia);
     
        
        return result;



      } else {
        console.error('Network error:', response.status,
        
         response.statusText);
        throw new Error('An error occurred while submitting the request..');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while submitting the request..');
    }


}

}
