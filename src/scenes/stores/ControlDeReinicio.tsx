import React, { useState, useEffect, useCallback } from 'react';
import { Box, useTheme, IconButton, Tabs, Tab } from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../components/Header';
import { obtenerLocales } from "../../data/DataVistaLocal"; 
import SyncIcon from '@mui/icons-material/Sync';
import SkeletonLoader from '../../components/SkeletonLoader';
import TablaLocales from './TablaLocales'; 
import { LocaltoReset } from '../../interfaces/vistaLocal';

const ControlDeReinicio = (props: any) => {
    const BrandIdPJD='329294b4-7ae9-44f6-8c58-ec758fb7b6dd';
    const BrandIdPollo='a45bf818-409f-4b09-8cb0-53a062f82596';
    const Jwt = props.Jwt;
    const setSelected = props.setSelected;
    setSelected("controlDeReinicio");
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    // Inicialización de estados
    const [locales, setLocales] = useState<LocaltoReset[]>([]);
    const [localesPJD, setLocalesPJD] = useState<LocaltoReset[]>([]);
    const [localesPollo, setLocalesPollo] = useState<LocaltoReset[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState<number>(0);
    const [needRefresh, setNeedRefresh] = useState(false); // Nuevo estado para el refresh

    // Función para manejar el cambio de tab
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Función para obtener datos
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await obtenerLocales(Jwt);
            setLocales(data || []); // Asegúrate de que no sea null
    
            // Filtrar y establecer locales para PJD y Pollo
            if (data) {
                const pjdLocales = data.filter(local => local.BrandId === BrandIdPJD);
                const polloLocales = data.filter(local => local.BrandId === BrandIdPollo);
    
                setLocalesPJD(pjdLocales);
                setLocalesPollo(polloLocales);
            }
        } catch (error) {
            console.error('Error fetching locales:', error);
        } finally {
            setLoading(false);
        }
    }, [Jwt]);

    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Efecto para manejar la necesidad de refrescar los datos
    useEffect(() => {
        if (needRefresh) {
            fetchData();
            setNeedRefresh(false); // Restablece el estado después de la recarga
        }
    }, [needRefresh, fetchData]);

    // Función para activar el refresco manualmente
    const handleSyncClick = () => {
        setNeedRefresh(true); // Activa el refresco de los datos
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', borderTopLeftRadius: 5 }}>
            {/* Header */}
            <Header title={"Control de Reinicio"} />
            {/* Botón de sincronización */}
            <Box sx={{ width: '90%', marginX: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
                <IconButton type="button" sx={{ p: 1 }} onClick={handleSyncClick} disabled={loading}>
                    <SyncIcon />
                </IconButton>
            </Box>
            {/* Tabs */}
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: colors.greenAccent[500],
                    },
                    '& .Mui-selected': {
                        color:`${colors.greenAccent[400]} !important`,
                    },
                    '& .MuiTab-root': {
                        color: colors.grey[100],
                    },
                }}
            >
                <Tab label="Toda las Marcas" />
                <Tab label="PJD" />
                <Tab label="Pollo Stop" />
            </Tabs>
            {/* Contenido de los Tabs */}
            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', width: '90%', marginX: 'auto', maxHeight: '70vh', minHeight: '70vh' }}>
                {loading ? (
                    <SkeletonLoader count={8} />
                ) : (
                    <TablaLocales 
                        locales={tabValue === 0 ? locales : tabValue === 1 ? localesPJD : localesPollo} 
                        BrandId={tabValue === 0 ? "All" : tabValue === 1 ? BrandIdPJD : BrandIdPollo} 
                        setNeedRefresh={setNeedRefresh} // Pasamos la función de refresco
                    />
                )}
            </Box>
            
        </Box>
    );
};

export default ControlDeReinicio;
