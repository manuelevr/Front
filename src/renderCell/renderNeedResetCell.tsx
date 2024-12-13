import React, { useState } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
const url = import.meta.env.VITE_REACT_APP_API_URL + "/updateNeedResetById  ";

let headers: HeadersInit = {
    "Content-Type": "application/json",
   // "Authorization": `Bearer ${Jwt}`
};

   
const renderNeedResetCell = (params: any) => {
    const necesitaReinicio = params.value; // Obtener el valor de la celda
    const [messageVisible, setMessageVisible] = useState(false);
    // Mensajes del tooltip dependiendo del estado
    const tooltipMessage = necesitaReinicio 
    ? 'El servicio esta marcado para reinicio.' 
    : 'Click aquí para enviar la orden de reinicio';
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevenir la propagación del clic
            console.log("🚀 ~ renderNeedResetCell ~ messageVisible:", messageVisible)
            setMessageVisible(true); // Cambiar el estado para mostrar el mensaje
            const body = {
                "id": params.row.Id,
                "needReset": true
            };
            //params.row
               fetch(url, {
                method: 'POST', // Asegúrate de especificar el método HTTP
                headers,
                body: JSON.stringify(body) // Convertir el cuerpo a una cadena JSON
            });
            
        };
    return (
        <Box 
            tabIndex={-1}
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            style={{ height: '100%', cursor: 'pointer' }} // Cambia el cursor a puntero para indicar clickeable
        >
         { messageVisible && !necesitaReinicio ? ( // Mostrar el mensaje si el estado es verdadero
                        <Typography  sx={{ 
                            margin: "auto", 
                            fontWeight:'bold', 
                            color: 'green'  
                        }}>¡Orden de reinicio enviada!</Typography>
                    ) :  (<Tooltip title={<span style={{ fontSize: '12px' }}>{tooltipMessage}</span>} arrow>
                <Box display="flex" alignItems="center" onClick={handleClick }>
                    {necesitaReinicio === false ? (
                        <CheckCircleIcon sx={{ color: 'green' }} /> // Ícono verde si no necesita reinicio
                    ) : (
                        <WarningIcon sx={{ color: 'orange' }} /> // Ícono de advertencia si necesita reinicio
                    )}
                    
                </Box>
            </Tooltip>) }
        </Box>
    );
};

export default renderNeedResetCell;
