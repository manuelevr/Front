import { LocaltoReset } from '../interfaces/vistaLocal';
import { ConteoMarca } from '../interfaces/marcas';

async function obtenerLocales(Jwt:string): Promise<LocaltoReset[] | null | undefined> {
    const url = import.meta.env.VITE_REACT_APP_API_URL + "/NeedResetSotres";

    let headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Jwt}`
    };
       
    
    try {
        const response = await fetch(url, { headers });
        let locales: LocaltoReset[]
        if (response.ok) {
            let responseData = await response.json();
           
            if (Array.isArray(responseData) && responseData.length > 0) {
                locales = responseData.map((localData: any) => ({
                    BrandId: localData.marcas,  // Mapea 'marcas' a 'BrandId'
                    BrandName: localData.nombremarcas,  // Mapea 'marcas' a 'BrandId'
                    CustomerId: localData.CustomerId, 
                    Id: localData.local_id,  // Mapea 'local_id' a 'Id'
                    Name: localData.local_nombre,  // Mapea 'local_nombre' a 'Name'
                    StoreId: localData.numero_del_local,  // Mapea 'numero_del_local' a 'StoreId'
                    lastRestart: localData.lastRestart || null,  // Agrega 'lastRestart', puede ser null si no está presente
                    needReset: localData.needReset || false  // Mapea 'needReset', inicialízalo como false si no está definido
                }));
                
                //console.log("🚀 ~ obtenerLocales ~ locales:", locales)
            
                
                
                return locales;
            } else {
                console.log("La respuesta de la API está vacía.");
                return [];
            }
                console.log("🚀 ~ obtenerLocales ~ locales:", locales)
        } else {
            console.log("Error al obtener los locales:");
            return null;
        }}
     catch (error: any) {
        console.error("Error al obtener los locales:", error.message);
        return null;
    }
}




export { obtenerLocales  };
