import React from 'react';
import { Box, Typography } from '@mui/material';

const renderCenterCell = (params: any) => {
    const celda = params.value; // Obtener el valor de la celda
    return (
        <Box display="flex" justifyContent="center" alignItems="center" tabIndex={-1} style={{ height: '100%' }}>
            <Typography sx={{ margin: "auto" }}>{celda || 'N/A'}</Typography>
        </Box>
    );
};

export default renderCenterCell;
