import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { DataGrid, GridColDef, GridColumnMenu, GridColumnMenuProps } from '@mui/x-data-grid';
import { LocaltoReset } from "../../interfaces/vistaLocal";
import { Box } from "@mui/material";
import renderCenterCell from '../../renderCell/renderCenterCell';
import renderFechaCell from '../../renderCell/renderFechaCell';
import renderNeedResetCell from '../../renderCell/renderNeedResetCell';
import ConfirmModal from './ConfirmModal'; // Asegúrate de importar el modal

interface TablaLocalesProps {
    locales: LocaltoReset[];
    BrandId: string;
    setNeedRefresh: React.Dispatch<React.SetStateAction<boolean>>; 
}
function CustomUserItem(props: { myCustomHandler: () => void, myCustomValue: string }) {
    const { myCustomHandler, myCustomValue } = props;
    return (
        <MenuItem onClick={myCustomHandler}>
            <ListItemIcon>
                <SettingsApplicationsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{myCustomValue}</ListItemText>
        </MenuItem>
    );
}

function CustomColumnMenu(props: GridColumnMenuProps & { onCustomAction: () => void }) {
    const { colDef, onCustomAction } = props;

    if (colDef.field !== 'needReset') {
        return <GridColumnMenu {...props} />;
    }

    return (
        <GridColumnMenu
            {...props}
            slots={{
                columnMenuUserItem: () => (
                    <CustomUserItem
                        myCustomHandler={onCustomAction}
                        myCustomValue="Reiniciar Todos"
                    />
                ),
            }}
            slotProps={{
                columnMenuUserItem: {
                    displayOrder: 15,
                },
            }}
        />
    );
}

const useColumns = (): GridColDef[] => {
    return [
        { 
            field: 'StoreId', 
            headerName: 'Número', 
            flex: 1, 
            minWidth: 100, 
            maxWidth: 150, 
            headerAlign: 'center', 
            renderCell: renderCenterCell 
        },
        { 
            field: 'Name', 
            headerName: 'Nombre', 
            flex: 2, 
            minWidth: 200, 
            headerAlign: 'center', 
            renderCell: renderCenterCell 
        },
        { 
            field: 'lastRestart', 
            headerName: 'Último Reinicio', 
            flex: 2, 
            minWidth: 150, 
            headerAlign: 'center', 
            renderCell: renderFechaCell,
        },
        { 
            field: 'needReset', 
            headerName: 'Necesita Reinicio', 
            flex: 1, 
            minWidth: 150, 
            headerAlign: 'center', 
            renderCell: renderNeedResetCell,
            sortable: false,
            filterable: false,
        },
    ];
};

const TablaLocales: React.FC<TablaLocalesProps> = ({ locales, BrandId,setNeedRefresh }) => {
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleAllReset = async() => {
        setModalOpen(true); // Abre el modal al hacer clic en "Reiniciar"
        
    };

 

    return (

        <Box sx={{ height: 'auto', width: '100%', overflowX: 'auto', flexGrow: 1 }}>
            
            <DataGrid
                rows={locales || []}
                columns={useColumns()}
                getRowId={(row) => row.StoreId}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 50,
                        },
                    },
                }}
                pageSizeOptions={[50]}
                disableRowSelectionOnClick
                slots={{
                    columnMenu: (props) => <CustomColumnMenu {...props} onCustomAction={handleAllReset} />
                }}
            />
            <ConfirmModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                BrandId={BrandId}
                setNeedRefresh={setNeedRefresh}
            />
        </Box>
    );
};

export default TablaLocales;