import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const url = import.meta.env.VITE_REACT_APP_API_URL + "/visivilidadlocal";
let headers: HeadersInit = {
    "Content-Type": "application/json",
   // "Authorization": `Bearer ${Jwt}`
};

const renderOperatovaCell = (params: any) => {
    const { value } = params; // Extraer el valor inicial de la celda
  
    // Inicializar el estado con el valor de params.value
    const [isVisible, setIsVisible] = useState<boolean>(value);

    // Función que maneja el evento al hacer clic para alternar el estado
    const handleClick = async () => {
        setIsVisible(!isVisible); // Alternar el estado entre true y false
        let body = {
            "id": params.row.id,
            "Operativo": !isVisible
        };
        console.log("🚀 ~ handleClick ~ body:", body)
        const response = await fetch(url, {
            method: 'POST', // Asegúrate de especificar el método HTTP
            headers,
            body: JSON.stringify(body) // Convertir el cuerpo a una cadena JSON
        });
        const data = await response.json(); // Convertir la respuesta a JSON
        console.log("Respuesta del servidor:", data); // Logear la respuesta
    };

    // Actualizar el mensaje del tooltip según el estado actual
    const tooltipMessage = isVisible ? "Ocultar" : "Mostrar";

    return (
        <Box display="flex" justifyContent="center" alignItems="center" tabIndex={-1} sx={{ height: '100%' }}>
            <Tooltip title={<span style={{ fontSize: '12px' }}>{tooltipMessage}</span>} arrow>
                <IconButton onClick={handleClick}>
                    {isVisible ? (
                        <VisibilityIcon />  // Mostrar icono de ojo si el estado es true
                    ) : (
                        <VisibilityOffIcon />  // Mostrar icono de ojo tachado si el estado es false
                    )}
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default renderOperatovaCell;
