import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Tabs, Tab, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from '../../../components/Header';
import {obtenerLocales } from "../../../data/locales";
import SyncIcon from '@mui/icons-material/Sync';
import StoresTable from './StoresTable'; // Asegúrate de tener este componente
import SkeletonLoader from '../../../components/SkeletonLoader';
import { Local } from "../../../interfaces/local";
import ControlDeTiendas from './ControlDeTiendas'; // Importar el nuevo componente

const Stores = (props: any) => {
    const Jwt = props.Jwt;
    const setSelected = props.setSelected;
    setSelected("stores");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [localesfitrados, setLocaleslocalesfitrados] = useState<Local[] | null>(null);
    const [locales, setLocales] = useState<Local[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState<number>(0); // Estado para la pestaña seleccionada
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    
    const fetchLocales = useCallback(async () => {
        setLoading(true);
        try {
            const dataFilter: any = await obtenerLocales(Jwt,true);
            const data: any = await obtenerLocales(Jwt,false);
            // console.log("🚀 ~ fetchLocales ~ data:", data)
            //console.log("Data fetched:", dataFilter);
            setLocaleslocalesfitrados(dataFilter);
            setLocales(data)
            
        } catch (error) {
            console.error('Error fetching locales:', error);
        } finally {
            setLoading(false);
        }
    }, [Jwt]);

    useEffect(() => {
        fetchLocales();
    }, [fetchLocales]);

 

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', borderTopLeftRadius: 5, overflow: 'hidden' }}>
            <Header title={"Estado de las tiendas"} />
            <Box sx={{ width: '90%', marginX: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
            </Box>
         <Box   sx={{
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginX:"auto"
  }}>
        

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: colors.greenAccent[500],
                    },
                    '& .Mui-selected': {
                        color: `${colors.greenAccent[400]} !important`,
                    },
                    '& .MuiTab-root': {
                        color: colors.grey[100],
                    },
                }}
            >
                <Tab label="Tiendas Operativas" />
                <Tab label="Control de Tiendas" />
            </Tabs>
            <IconButton type="button" sx={{ p: 1 }} onClick={fetchLocales} disabled={loading}>
                    <SyncIcon />
                </IconButton>
         </Box>
            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', width: '90%', marginX: 'auto', maxHeight: '75vh' }}>
                {loading ? (
                    <SkeletonLoader count={8} />
                ) : (
                    tabValue === 0 ? (
                        <StoresTable 
                            locales={localesfitrados} 
                            loading={loading}
                          
                        />
                    ) : (
                        <ControlDeTiendas 
                        locales={locales} 
                        loading={loading}
                      
                    />
                    )
                )}
            </Box>
        </Box>
    );
};

export default Stores;
