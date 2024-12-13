import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
       BrandId: string;
       setNeedRefresh: React.Dispatch<React.SetStateAction<boolean>>; 
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose,  BrandId ,setNeedRefresh}) => {
    const handleClose = async () => {
        const url = import.meta.env.VITE_REACT_APP_API_URL + "/updateNeedResetByBrandId";
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        const body = {
            brandId: BrandId, 
            needReset: true
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Respuesta de la API:', data);
            setNeedRefresh(true);
           
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        } finally {
            onClose();  // Asegúrate de cerrar el modal
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                bgcolor: 'background.paper', 
                borderRadius: 1, 
                boxShadow: 24, 
                p: 4,
                width: '300px',
                margin: 'auto',
                marginTop: '20%',
            }}>
                <Typography variant="h6" component="h2">
                    Confirmar Reinicio Múltiple
                </Typography>
                <Typography sx={{ mt: 2, marginX: "auto" }}>
                    ¿Estás seguro de que deseas marcar todos los locales de esta pestaña para ser reiniciados?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={onClose} color="secondary" sx={{ mr: 1 }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleClose} variant="contained">
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmModal;
