import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const renderIdCell = (params: any) => {
    const [copied, setCopied] = useState(false); // Estado para controlar si se ha copiado
    const celda = params.value; // Obtener el valor de la celda

    const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault(); // Prevenir la selección del texto
        if (celda && celda !== 'N/A') { // Verificar que el contenido no sea 'N/A'
            try {
                await navigator.clipboard.writeText(celda); // Copiar al portapapeles
                setCopied(true); // Mostrar que se ha copiado
                setTimeout(() => {
                    setCopied(false); // Restablecer después de 2 segundos
                }, 1000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    };

    return (
        <Box 
            tabIndex={-1}
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            style={{ height: '100%', cursor: celda && celda !== 'N/A' ? 'pointer' : 'default' }}
            onClick={handleClick}
        >
            <Typography 
                sx={{ 
                    margin: "auto", 
                    fontWeight: copied ? 'bold' : 'normal', 
                    color: copied ? 'green' : 'inherit' // Cambiar color a verde si se copió
                }}
            >
                {copied ? '¡Copiado al portapapeles!' : celda || 'N/A'}
            </Typography>
        </Box>
    );
};

export default renderIdCell;