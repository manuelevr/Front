import { obtenerToken } from '../authentication/auth';
import { Incidencia } from '../interfaces/incidencia';

async function obtenerIncidencias(Jwt: string): Promise<Incidencia[] | null | undefined>;
async function obtenerIncidencias(Jwt: string, id: number): Promise<Incidencia | null | undefined>;
async function obtenerIncidencias(Jwt: string, id?: number): Promise<Incidencia[] | Incidencia | null | undefined> {
    let url: string;

    if (id) {
        url = `${import.meta.env.VITE_REACT_APP_API_URL}/incidenciabyid/${id}`;
    } else {
        url = `${import.meta.env.VITE_REACT_APP_API_URL}/incidencias/`;
    }

    let headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Jwt}`
    };

    try {
        const response = await fetch(url, { headers });

        if (response.ok) {
            const responseData = await response.json();
            if (Array.isArray(responseData) && responseData.length > 0) {
                const incidencias: Incidencia[] = responseData.map((incidenciaData: any) => ({
                    id: incidenciaData.id,
                    fecha: incidenciaData.fecha,
                    tipo: incidenciaData.tipo,
                    local_id: incidenciaData.local_id,
                    descripcion: incidenciaData.descripcion
                }));

                console.log("🚀 ~ Incidencias ~ incidencias:", incidencias);
                return incidencias;
            } else {
                console.log("La respuesta de la API está vacía.");
                return [];
            }
        } else {
            console.log("Error al obtener las incidencias:");
            return null;
        }
    } catch (error: any) {
        console.error("Error al obtener las incidencias:", error.message);
        return null;
    }
}

export { obtenerIncidencias };
