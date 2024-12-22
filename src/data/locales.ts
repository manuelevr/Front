import { Credenciales } from '../interfaces/credenciales';
import { Local } from '../interfaces/local';
import { obtenerToken } from '../authentication/auth';

const urlbase = import.meta.env.VITE_REACT_APP_API_URL ;
console.log("🚀 ~ urlbase:", urlbase)

async function obtenerLocales(Jwt:string, filter:boolean): Promise<Local[] | null | undefined> {
    const CostumerId =import.meta.env.VITE_REACT_APP_COSTUMER_ID;
    console.log("🚀 ~ obtenerLocales ~ CostumerId:", CostumerId)
    
    const url = filter? (import.meta.env.VITE_REACT_APP_API_URL + "/localoperativo"):(import.meta.env.VITE_REACT_APP_API_URL + "/fulllocal");
    let headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Jwt}`
    };
       

    try {
        
        const response = await fetch(url, { headers });

        if (response.ok) {
            const responseData = await response.json();
            console.log("🚀 ~ obtenerLocales ~ responseData:", responseData)
            if (Array.isArray(responseData) && responseData.length > 0) {
                const locales: Local[] = responseData.map((localData: any) => ({
                    id: localData.local_id,
                    numero_del_local: localData.numero_del_local,
                    nombre: localData.local_nombre,
                    estado: localData.estado,
                    estado_sql_login: localData.estado_sql_login, 
                    marcas: localData.marcas,
                    cliente: localData.cliente_nombre,
                    operativa:localData.Operativa
                }));
                
                console.log("🚀 ~ Locales ~ locales:", locales);
                return locales;
            } else {
                console.log("La respuesta de la API está vacía.");
                return [];
            }
        } else {
            console.log("Error al obtener los locales:");
            return null;
        }
    } catch (error: any) {
        console.error("Error al obtener los locales:", error.message);
        return null;
    }
}

export {  obtenerLocales};
