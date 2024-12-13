import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const renderEventsCell = (params: any) => {
    const { nombre, numero_del_local } = params.row; // Obtener nombre y número del local
    const navigate = useNavigate(); // Usar useNavigate para redireccionar

    const handleButtonClick = () => {
        navigate(`/events/${numero_del_local}`); // Redirigir a la ruta deseada
    };

    return (
        <Box tabIndex={-1} display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
            <Tooltip 
                title={<Typography variant="body2" sx={{ fontSize: '12px' }}>{`Eventos asociados al local: ${nombre} (ID: ${numero_del_local})`}</Typography>} 
                arrow
                placement="top" 
            >
                <IconButton onClick={handleButtonClick}>
                    <NotificationsIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default renderEventsCell;
