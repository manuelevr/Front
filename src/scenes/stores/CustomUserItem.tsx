import React, { useState } from 'react';
import { MenuItem, ListItemIcon, ListItemText, Modal, Box, Typography, Button } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

interface CustomUserItemProps {
    myCustomHandler: () => void;  // Función que se ejecuta al confirmar
    myCustomValue: string;        // Valor que se muestra en el menú
    fetchData: () => void;        // Función que se ejecuta al cerrar el modal
}

const CustomUserItem: React.FC<CustomUserItemProps> = ({ myCustomHandler, myCustomValue, fetchData }) => {
    const [open, setOpen] = useState(false);  // Estado para controlar la apertura del modal

    const handleOpen = () => setOpen(true);   // Abrir modal
    const handleClose = () => setOpen(false); // Cerrar modal

    const handleConfirm = () => {
        fetchData();  // Llamar a fetchData cuando el usuario confirma
        setOpen(false); // Cerrar modal después de confirmar
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>
                <ListItemIcon>
                    <SettingsApplicationsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{myCustomValue}</ListItemText>
            </MenuItem>

            {/* Modal de confirmación */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Confirmación
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        ¿Estás seguro de que deseas cambiar el renderizado?
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            Confirmar
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default CustomUserItem;