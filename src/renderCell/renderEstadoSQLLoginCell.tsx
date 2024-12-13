import React from 'react';
import { Box, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const renderEstadoSQLLoginCell = (params: any) => {
    const estado_sql_login = params.row.estado_sql_login;
    const estado = params.row.estado;
    const isFallo = estado_sql_login.startsWith('Fallo');
    
    return (
        <Box tabIndex={-1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {(estado_sql_login !== 'Conectado' || estado === 'Fuera de Servicio') ? (
                <Tooltip title={<span style={{ fontSize: '12px' }}>{estado === 'Fuera de Servicio' ? estado : estado_sql_login}</span>} arrow>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </span>
                </Tooltip>
            ) : (
                <Tooltip title={<span style={{ fontSize: '12px' }}>{estado_sql_login}</span>} arrow>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon sx={{ color: 'green' }} />
                    </span>
                </Tooltip>
            )}
        </Box>
    );
};

export default renderEstadoSQLLoginCell;
