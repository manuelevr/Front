import { obtenerToken } from '../authentication/auth';
import { event } from '../interfaces/event'; // Asegúrate de que la ruta sea correcta

async function obtenerEventos(Jwt: string): Promise<event[] | null | undefined>;
async function obtenerEventos(Jwt: string, id: number): Promise<event | null | undefined>;
async function obtenerEventos(Jwt: string, id?: number): Promise<event[] | event | null | undefined> {
    let url: string;

    if (id) {
        url = `${import.meta.env.VITE_REACT_APP_API_URL}/eventsbyid/${id}`; // Cambia la URL según sea necesario
    } else {
        url = `${import.meta.env.VITE_REACT_APP_API_URL}/events/`; // Cambia la URL según sea necesario
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
                const eventos: event[] = responseData.map((eventoData: any) => ({
                    id: eventoData.id,
                    event_date: eventoData.event_date,
                    event_type: eventoData.event_type,
                    event_subtype: eventoData.event_subtype,
                    event_detail: eventoData.event_detail,
                    StoreId: eventoData.StoreId,
                    DhubOrderId: eventoData.DhubOrderId // Este campo es opcional
                }));

                console.log("🚀 ~ Eventos ~ eventos:", eventos);
                return eventos;
            } else {
                console.log("La respuesta de la API está vacía.");
                return [];
            }
        } else {
            console.log("Error al obtener los eventos:");
            return null;
        }
    } catch (error: any) {
        console.error("Error al obtener los eventos:", error.message);
        return null;
    }
}

export { obtenerEventos };