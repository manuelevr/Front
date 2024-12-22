// StoresTable.tsx
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Local } from "../../../interfaces/local";
import renderEventsCell from '../../../renderCell/renderEventsCell'; 
import renderCenterCell from '../../../renderCell/renderCenterCell'; 
import renderEstadoCell from '../../../renderCell/renderEstadoCell'; 
import renderEstadoSQLLoginCell from '../../../renderCell/renderEstadoSQLLoginCell'; 
import SkeletonLoader from '../../../components/SkeletonLoader';
interface StoresTableProps {
    locales: Local[] | null; // Acepta locales como prop
    loading: boolean;        // Estado de carga
}

const StoresTable: React.FC<StoresTableProps> = ({ locales, loading }) => {
    const useColumns = (): GridColDef[] => {
        return [
            {
                field: 'estado',
                headerName: 'Estado',
                flex: 1,
                minWidth: 50,
                maxWidth: 150,
                headerAlign: 'center',
                renderCell: renderEstadoCell,
            },
            {
                field: 'estado_sql_login',
                headerName: 'SQL',
                flex: 1,
                minWidth: 100,
                maxWidth: 150,
                headerAlign: 'center',
                renderCell: renderEstadoSQLLoginCell,
            },
            {
                field: 'numero_del_local',
                headerName: 'Número',
                flex: 1,
                minWidth: 100,
                maxWidth: 150,
                headerAlign: 'center',
                renderCell: renderCenterCell 
            },
            { 
                field: 'nombre', 
                headerName: 'Nombre', 
                flex: 2, 
                minWidth: 200,
                headerAlign: 'center',
                renderCell: renderCenterCell 
            },
            { 
                field: 'marcas', 
                headerName: 'Marcas', 
                flex: 2, 
                minWidth: 100,
                headerAlign: 'center',
                renderCell: renderCenterCell 
            },
            {
                field: 'event',
                headerName: 'Eventos asociados',
                flex: 1,
                minWidth: 100,
                headerAlign: 'center',
                renderCell: renderEventsCell,
                sortable: false, // Desactivar ordenamiento solo en esta columna
                filterable: false 
            },
        ];
    };

    return (
        <div style={{ height: 'auto', width: '100%', overflowX: 'auto', flexGrow: 1 }}>
            {loading ? (
                <SkeletonLoader count={8} />
            ) : (
                <DataGrid
                    rows={locales || []}
                    columns={useColumns()}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 50,
                            },
                        },
                    }}
                    pageSizeOptions={[2]}
                    disableRowSelectionOnClick
                />
            )}
        </div>
    );
};

export default StoresTable;
