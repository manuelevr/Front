import React, { useState } from 'react';
import { Box, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';

const renderDescripcionCell = (params: any) => {
    const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal

    const handleOpenModal = () => setOpenModal(true); // Abrir modal
    const handleCloseModal = () => setOpenModal(false); // Cerrar modal

    const descripcion = params.row.event_detail; // Extraer descripción del evento

    return (
        <>
            <Box display="flex" tabIndex={-1}  justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Tooltip title="Ver descripción" arrow>
                    <IconButton onClick={handleOpenModal} sx={{ padding: 0 }}>
                        <NotesIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Modal que muestra la descripción del evento */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="h2">
                            Descripción del Evento
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography sx={{ mt: 2 }}>
                        {descripcion ? descripcion : 'No hay descripción disponible'}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default renderDescripcionCell;
