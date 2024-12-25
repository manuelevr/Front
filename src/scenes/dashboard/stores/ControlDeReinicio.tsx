import React, { useState, useEffect, useCallback } from 'react';
import { Box, useTheme, IconButton, Tabs, Tab } from "@mui/material";
import { tokens } from "../../../theme";
import Header from '../../../components/Header';
import { obtenerLocales } from "../../../data/DataVistaLocal"; 
import SyncIcon from '@mui/icons-material/Sync';
import SkeletonLoader from '../../../components/SkeletonLoader';
import TablaLocales from './TablaLocales'; 
import { LocaltoReset } from '../../../interfaces/vistaLocal';
import { ConteoMarca } from '../../../interfaces/marcas';

const ControlDeReinicio = (props: any) => {
 
    const Jwt = props.Jwt;
    const setSelected = props.setSelected;
    setSelected("controlDeReinicio");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Inicialización de estados
    const [locales, setLocales] = useState<LocaltoReset[]>([]);
    const [localesPorMarca, setLocalesPorMarca] = useState<Record<string, LocaltoReset[]>>({});
    const [Marcas, setMarcas] = useState<Map<string, ConteoMarca>>(new Map());
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState<number>(0);
    const [needRefresh, setNeedRefresh] = useState(false); // Nuevo estado para el refresh

    // Función para manejar el cambio de tab
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Obtener marcas y actualizar locales por marca
    const ObtenerMarcas = (Locales: LocaltoReset[]) => {
        const marcas = new Map<string, ConteoMarca>();

        Locales.forEach(local => {
            if (marcas.has(local.BrandId)) {
                // Si ya existe la marca, incrementamos la cantidad
                const marca = marcas.get(local.BrandId);
                if (marca) {
                    marca.cantidad += 1;
                }
            } else {
                // Si no existe la marca, la creamos
                marcas.set(local.BrandId, { cantidad: 1, nombre: local.BrandName });
            }
        });

        setMarcas(marcas); // Actualizamos el estado de las marcas

        // Filtramos los locales por cada marca
        const localesPorMarca = Locales.reduce((acc: Record<string, LocaltoReset[]>, local) => {
            if (!acc[local.BrandId]) {
                acc[local.BrandId] = [];
            }
            acc[local.BrandId].push(local);
            return acc;
        }, {});

        setLocalesPorMarca(localesPorMarca); // Actualizamos el estado de los locales por marca
    };

    // Función para obtener los datos
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await obtenerLocales(Jwt);
            setLocales(data || []); // Asegúrate de que no sea null
            ObtenerMarcas(data || []);
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
            <Box sx={{
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
                    {/* Pestaña para todas las marcas */}
                    <Tab label="Toda las Marcas" />
                    {/* Generación dinámica de las pestañas por cada marca */}
                    {Array.from(Marcas.keys()).map((key) => (
                        <Tab key={key} label={Marcas.get(key)?.nombre} />
                    ))}
                </Tabs>

                <IconButton type="button" sx={{ p: 1 }} onClick={handleSyncClick} disabled={loading}>
                    <SyncIcon />
                </IconButton>
            </Box>

            {/* Contenido de los Tabs */}
            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', width: '90%', marginX: 'auto', maxHeight: '70vh', minHeight: '70vh' }}>
                {loading ? (
                    <SkeletonLoader count={8} />
                ) : (
                    <TablaLocales 
                        locales={tabValue === 0 ? locales : localesPorMarca[Array.from(Marcas.keys())[tabValue - 1]] || []} 
                        BrandId={tabValue === 0 ? "All" : Array.from(Marcas.keys())[tabValue - 1]} 
                        setNeedRefresh={setNeedRefresh} // Pasamos la función de refresco
                    />
                )}
            </Box>
        </Box>
    );
};

export default ControlDeReinicio;
