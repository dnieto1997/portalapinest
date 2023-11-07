

export const nequiTopup = async ( reference,amount,user_doc,user_num_account,user_email,user_name ) => {
  /*   const user = 'TOPPAY_33344249563';
    const pass = '3V3C3a$RsqgmLb50rbqLr0dLv1';
    const apiUrl = "https://transactions.topup.com.co/production/api/v1/payout";
    const token = "ef8b0461f5738e3084679bd6897d66d43c89e85e2aa060d029fa73f8576a3337";
    const autorizacion = "Basic VE9QUEFZXzMzMzQ0MjQ5NTYzOjNWM0MzYSRSc3FnbUxiNTByYnFMcjBkTHYx";

    let myHeaders = new Headers();
    myHeaders.append("Token-Top", token);
    myHeaders.append("Authorization", autorizacion);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "response_sandbox": "APPROVED",
      "register": true,
      "payment_method": "NEQUI",
      "reference": `${reference}`,
      "amount": `${amount}`,
      "currency": "COP",
      "customer_data": {
        "legal_doc": `${user_doc}`,
        "legal_doc_type": "CC",
        "phone_code": "57",
        "phone_number": `${user_num_account}`,
        "email": `${user_email}`,
        "full_name": `${user_name}`
      }
    });

    let requestOptions:RequestInit  = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }; 

    const response = await fetch(apiUrl, requestOptions); 
    const result = await response.text();  */


    const resp = {
      "code": "01",
      "status": "SUCCESS",
      "message": "Operacion exitosa",
      "data": {
      "ticket": "c7ae9db9-cd75-11ed-ac16-06208d634943",
      "date": "2023-03-28 09:35:26",
      "transaction": {
      "reference": `${reference}`,
      "amount": `${amount}`,
      "currency": "COP",
      "payment_method": "TOPUP"
      },
      "user": {
      "legal_doc": `${user_doc}`,
      "legal_doc_type": "CC",
      "phone_code": "57",
      "phone_number": `${user_num_account}`,
      "email": `${user_email}`,
      "full_name": `${user_name}`,
      "id": "48938191-ccf8-11ed-ac16-06208d634943"
      }
      }
      }
      
      
     

      return JSON.stringify(resp)
}


export const  nequiSaldo = async (  ) => {
/* 
        const user = 'TOPPAY_33344249563';
        const pass = '3V3C3a$RsqgmLb50rbqLr0dLv1';
        const apiUrl = "https://transactions.topup.com.co/production/api/v1/merchant/me";
        const token = "ef8b0461f5738e3084679bd6897d66d43c89e85e2aa060d029fa73f8576a3337";
        const autorizacion = "Basic VE9QUEFZXzMzMzQ0MjQ5NTYzOjNWM0MzYSRSc3FnbUxiNTByYnFMcjBkTHYx";
    
        let myHeaders = new Headers();
        myHeaders.append("Token-Top", token);
        myHeaders.append("Authorization", autorizacion);
        myHeaders.append("Content-Type", "application/json");
    
        let requestOptions: RequestInit = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.text();
        return result;  */

       
      }


