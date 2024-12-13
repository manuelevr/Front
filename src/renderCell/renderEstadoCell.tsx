import React from 'react';
import { Box, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';

const renderEstadoCell = (params: any) => {
    const estado = params.row.estado;
    const estado_sql_login = params.row.estado_sql_login;

    // Contenedor común para el icono
    const iconContainer = (
        <Box tabIndex={-1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Tooltip title={<span style={{ fontSize: '12px' }}>{getTooltipMessage(estado, estado_sql_login)}</span>} arrow>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    {getIcon(estado, estado_sql_login)}
                </span>
            </Tooltip>
        </Box>
    );

    return iconContainer;
};

// Función para obtener el mensaje de tooltip según el estado
const getTooltipMessage = (estado: string, estado_sql_login: string) => {
    if (estado === 'Operativa' && estado_sql_login !== "Conectado") {
        return "Servicio Corriendo Sin comunicacion con MRC";
    } else if (estado === 'Operativa') {
        return "Servicio Corriendo con normalidad";
    } else {
        return "Servicio detenido o sin internet";
    }
};

// Función para obtener el ícono correspondiente según el estado
const getIcon = (estado: string, estado_sql_login: string) => {
    if (estado === 'Operativa' && estado_sql_login !== "Conectado") {
        return <WarningIcon sx={{ color: 'orange' }} />;
    } else if (estado === 'Operativa') {
        return <CheckCircleIcon sx={{ color: 'green' }} />;
    } else {
        return <CancelIcon sx={{ color: 'red' }} />;
    }
};

export default renderEstadoCell;
