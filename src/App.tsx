import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from "react";
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import ControlDeReinicio from './scenes/stores/ControlDeReinicio';
import FAQ from './scenes/faq';
import { Route, Routes } from 'react-router-dom';
import Events from './scenes/events';
import { DataGrid } from '@mui/x-data-grid';
import SignIn from './authentication/SignIn';
import RequireAuth from './authentication/RequireAuth';
import Stores from './scenes/stores/Stores'
function App() {
  const { theme, colorMode } = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [selected, setSelected] = useState("stores");
  const [Jwt, setJwt] = useState("");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RequireAuth setJwt={setJwt}>
          <div style={{ display: 'flex', height: '100vh', maxHeight: '100%', minHeight: '100vh' }}>
            <Sidebar  selected={selected} setSelected={setSelected}/>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '100%', minWidth: '300px', minHeight: '100vh' }}>
              <Topbar setIsSidebar={setIsSidebar} />
              <div style={{ flex: 1, overflow: 'visible', display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
                <div className="pepe" style={{ width: '100%', overflowX: 'auto', height: 'auto' }}>
                  <Routes>
                    <Route path="/" element={<Stores Jwt = {Jwt} setSelected={setSelected} />} />
                    <Route path="/servicescontrol" element={<ControlDeReinicio Jwt = {Jwt} setSelected={setSelected} />} />
                    <Route path="/events/:id" element={<Events Jwt = {Jwt} setSelected={setSelected} />} />
                    <Route path="/events" element={<Events Jwt = {Jwt} setSelected={setSelected}  />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </RequireAuth>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
