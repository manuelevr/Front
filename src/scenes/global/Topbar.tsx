import React, { useContext } from 'react';
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Dispatch, SetStateAction } from 'react';

interface TopbarProps {
  setIsSidebar: Dispatch<SetStateAction<boolean>>;
  setJWT: Dispatch<SetStateAction<string>>; // Nuevo prop para actualizar el JWT
}

const Topbar: React.FC<TopbarProps> = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Función para manejar el logout, que limpia el JWT
  const handleLogout = () => {
    //setJWT(''); // Elimina el JWT (simula un logout)
    window.location.reload(); // Refresca la página
  };

  return (
    <Box component="div" display="flex" justifyContent="flex-end" p={1}>
      {/* ICONS */}
      <Box component="div" display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* Botón de logout */}
        <IconButton onClick={handleLogout}>
          <ExitToAppOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
