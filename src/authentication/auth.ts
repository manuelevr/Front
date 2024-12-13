import { Credenciales } from '../interfaces/credenciales';

async function obtenerToken(credenciales: Credenciales): Promise<string | null> {
    const headersList = {
    
      "Content-Type": "application/json"
    };
    console.log('entre a la obtencion con'+credenciales.password)
    const bodyContent = JSON.stringify({
      "username": credenciales.username,
      "password": credenciales.password
    });
      
   
    try {
      const response = await fetch("https://hdnn615p-3000.brs.devtunnels.ms/login", {
        method: "POST",
        body: JSON.stringify(credenciales),
        headers: headersList
      });
  
      const data = await response.text();
      // Suponiendo que el token está en el cuerpo de la respuesta
      return data;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      // Manejar el error según sea necesario
      return null;
    }
  }
export{obtenerToken};