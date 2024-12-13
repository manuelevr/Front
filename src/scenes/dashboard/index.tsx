import { Box } from "@mui/material";
import Header from "../../components/Header";
import Topbar from "../global/Topbar";
import Stores from "../stores/stores";
import Sidebar from "../global/Sidebar";
import { Route, Routes } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import SignIn from "../../authentication/SignIn";

const Dashboard = ()=>{
    const [isSidebar, setIsSidebar] = useState(true);
    return <Box >
            <Routes>
        <Sidebar isSidebar={isSidebar} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' ,maxHeight:'100%',minWidth: '300px',minHeight:'100vh'}}>
    <Topbar setIsSidebar={setIsSidebar} />
    <div style={{ flex: 1, overflow: 'visible', display: 'flex', flexDirection: 'column' , maxHeight:'100%'}}>
        <div  className ="pepe" style={{ width: '100%', overflowX: 'auto' ,height:'auto'}}> {/* Envuelve Routes en un div y aplica el estilo aquí */}
                <Route path="/" element={<Stores />} />
                <Route path="/incidences" element={<>Incidencias</>} />
        </div>
    </div>
    </div>
   
     </Routes>
    </Box>
}
export default Dashboard;