import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Credenciales } from '../interfaces/credenciales';
import { obtenerToken } from './auth';
import {  useState, useEffect } from 'react';

// Tema por defecto
const defaultTheme = createTheme();

interface SignInProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const SignIn: React.FC<SignInProps> = ({ setIsAuthenticated, setJwt,setUser }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Cargar los datos del usuario si existen en localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedToken = localStorage.getItem('token')||'';
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedRememberMe === 'true') {
      setUsername(storedUsername || '');
      setPassword(storedPassword || '');
      setJwt(storedToken); 
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credenciales: Credenciales = {
      username,
      password,
    };
    setUser(credenciales.username);
    // Restablecer el mensaje de error al enviar el formulario
    setErrorMessage('');

    try {
      const tokenResponse = await obtenerToken(credenciales);
      if (tokenResponse?.toString().includes('token')) {
        const { token } = JSON.parse(tokenResponse);

        setJwt(token);
        setIsAuthenticated(true);

        // Si "Remember me" está seleccionado, guardar las credenciales
        if (rememberMe) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('token', token);
          localStorage.setItem('rememberMe', 'true');
        } else {
          // Si no está seleccionado, limpiar el almacenamiento
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('token');
          localStorage.removeItem('rememberMe');
        }
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
      setErrorMessage('Hubo un problema al iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {/* Mostrar el mensaje de error si existe */}
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="Usuario"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
