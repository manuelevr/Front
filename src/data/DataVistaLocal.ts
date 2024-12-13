import { LocaltoReset } from '../interfaces/vistaLocal';

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
                    Id: localData.local_id,  // Mapea 'local_id' a 'Id'
                    Name: localData.local_nombre,  // Mapea 'local_nombre' a 'Name'
                    StoreId: localData.numero_del_local,  // Mapea 'numero_del_local' a 'StoreId'
                    BrandId: localData.marcas,  // Mapea 'marcas' a 'BrandId'
                    LocalGroupId: '',  // LocalGroupId no está en la respuesta, inicialízalo vacío o como desees
                    needReset: localData.needReset || false,  // Mapea 'needReset', inicialízalo como false si no está definido
                    lastRestart: localData.lastRestart || null  // Agrega 'lastRestart', puede ser null si no está presente
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
        }}
     catch (error: any) {
        console.error("Error al obtener los locales:", error.message);
        return null;
    }
}

export { obtenerLocales };
