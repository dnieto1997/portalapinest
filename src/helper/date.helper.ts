
const currentDate = new Date(); // Esto obtiene la fecha y hora actual en formato UTC
    currentDate.setUTCHours(currentDate.getUTCHours() - 5); // Resta 5 horas
    
    const year = currentDate.getUTCFullYear();
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getUTCDate().toString().padStart(2, '0');
    const hours = currentDate.getUTCHours().toString().padStart(2, '0');
    const minutes = currentDate.getUTCMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getUTCSeconds().toString().padStart(2, '0');
    
 export const dateact= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
