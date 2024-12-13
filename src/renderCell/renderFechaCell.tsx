import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Importa el icono de información
import { blue } from '@mui/material/colors'; // Importa el color azul, o usa tu propio esquema de colores

const renderFechaCell = (params: any) => {
    const celda = params.value; // Obtener el valor de la celda

    // Verificar si la celda tiene un valor y si es un objeto Date
    const fecha = celda ? new Date(celda) : null;

    // Formatear la fecha
    const fechaFormateada = fecha ? 
        `${fecha.getUTCFullYear()}-${(fecha.getUTCMonth() + 1).toString().padStart(2, '0')}-${fecha.getUTCDate().toString().padStart(2, '0')} ${fecha.getUTCHours().toString().padStart(2, '0')}:${fecha.getUTCMinutes().toString().padStart(2, '0')}` 
        : null; // Si no hay fecha, dejamos null

    return (
        <Box 
        tabIndex={-1}
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            style={{ height: '100%', padding: '8px' }} 
        >
            {fechaFormateada!="1970-01-01 00:00" ? (
                <Typography>
                    {fechaFormateada}
                </Typography>
            ) : (
                // Envolvemos el InfoIcon dentro de un solo contenedor con tooltip
                <Tooltip title={<span style={{ fontSize: '12px' }}>No se registra fecha de reinicio</span>} arrow>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <InfoIcon sx={{ color: blue[600] }} /> {/* Cambiar a azul acentuado */}
                    </Box>
                </Tooltip>
            )}
        </Box>
    );
};

export default renderFechaCell;
