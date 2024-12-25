import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, useTheme, IconButton, Tooltip, Modal } from "@mui/material";
import { tokens } from "../theme";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Header from '../components/Header';
import SyncIcon from '@mui/icons-material/Sync';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerEventos } from '../data/event'; // Asegúrate de que la ruta sea correcta
import { event } from '../interfaces/event'; // Asegúrate de que la ruta sea correcta
import SkeletonLoader from '../components/SkeletonLoader';
import renderIdCell from '../renderCell/renderIdCell'; // Importar función de ID
import renderCenterCell from '../renderCell/renderCenterCell'; // Importar función de centrado
import renderDescripcionCell from '../renderCell/renderDescripcionCell'; // Importar función de descripción
import renderFechaCell from '../renderCell/renderFechaCell'; // Importar función de descripción
import { esES } from '@mui/x-data-grid/locales';


const Events = (props: any) => {
    const { id } = useParams();
    const Jwt = props.Jwt;
    const setSelected = props.setSelected;
    setSelected("events");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [eventos, setEventos] = useState<event[] | null>(null);
    const [loading, setLoading] = useState(true);
   
    const fetchEventos = useCallback(async () => {
        setLoading(true);
        try {
            const data: any = id === undefined ? await obtenerEventos(Jwt) : await obtenerEventos(Jwt, parseInt(id, 10));

            console.log('Eventos:', data);
            setEventos(data); // Usamos la función con 'event[]'
        } catch (error) {
            console.error('Error fetching eventos:', error);
        } finally {
            setLoading(false);
        }
    }, [Jwt, id]);

    useEffect(() => {
        fetchEventos();
    }, [fetchEventos]);
    
    const columns: GridColDef[] = [
        {
            field: 'DhubOrderId',
            headerName: 'ID de Orden Dhub',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center', 
            renderCell: renderIdCell,
        },
        
        { field: 'event_date', headerName: 'Fecha', flex: 1,headerAlign: 'center', maxWidth: 150,   renderCell: renderFechaCell,minWidth: 150 },
        { field: 'event_type', headerName: 'Tipo', flex: 1, headerAlign: 'center', maxWidth: 100,  renderCell: renderCenterCell,minWidth: 200 },
        { field: 'event_subtype', headerName: 'Subtipo', flex: 1, headerAlign: 'center', maxWidth: 100,  renderCell: renderCenterCell,minWidth: 200 },
        { 
            field: 'event_detail', 
            headerName: 'Descripción', 
            flex: 1, 
            minWidth: 50,
            maxWidth: 100,
            headerAlign: 'center', 
            renderCell: renderDescripcionCell // Asignar el renderizador personalizado
        },
        { field: 'StoreId', headerName: 'ID del Local', flex: 1, headerAlign: 'center', minWidth: 150, renderCell: renderIdCell,},
    ];
    
    function getTitle(): string {
        return id === undefined ? "Eventos Generales" : `Eventos de la Tienda ${id}`;
    }
    
    return (
        <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', borderTopLeftRadius: 5 }}>
            <Header title={getTitle()} />
            <Box sx={{ width: '90%', marginX: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
                <IconButton type="button" sx={{ p: 1 }} onClick={fetchEventos}>
                    <SyncIcon />
                </IconButton>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', overflowX: 'auto', overflowY: 'auto', width: '90%', marginX: 'auto', height: '70vh' }}>
                {loading ? (
                    <SkeletonLoader count={8} />
                ) : (
                    <Box sx={{ height: '80vh', width: '100%', overflowX: 'auto', flexGrow: 1 }}>
                        <DataGrid
                            rows={eventos || []}
                            columns={columns}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 50,
                                    },
                                },
                            }}
                            pageSizeOptions={[50]}
                            disableRowSelectionOnClick
                            onRowClick={(params) => {
                                console.log("🚀 ~ Eventos ~ params:", params)
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};




export default Events;
