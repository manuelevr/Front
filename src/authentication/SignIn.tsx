import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Credenciales } from '../interfaces/credenciales';
import { obtenerToken } from './auth';
import { useContext } from 'react';
import { Contexto } from '../Context/MyContext';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface SignInProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean >>;
  setJwt: React.Dispatch<React.SetStateAction<string >>;
}
const SignIn: React.FC<SignInProps> = ({ setIsAuthenticated ,setJwt }) => {
 //Contexto
    const{contextState} =  useContext(Contexto);
    console.log("🚀 ~ contextState:", contextState)
 
 
 
 
 
 
 
 //Contexto
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
       
    const data = new FormData(event.currentTarget);
    const credenciales: Credenciales = {
      username: data.get('user') ? data.get('user')!.toString() : '',
      password: data.get('password') ? data.get('password')!.toString() : ''
    };
    import.meta.env.VITE_REACT_APP_JWT ="";
    const tokenResponse = await obtenerToken(credenciales);
    console.log("🚀 ~ handleSubmit ~ tokenResponse:", tokenResponse)
   
    if (tokenResponse?.toString().includes('token')) {
      const { token,CustomerId } = JSON.parse(tokenResponse);
      
      import.meta.env.VITE_REACT_APP_JWT = token;
      import.meta.env.VITE_REACT_APP_COSTUMER_ID=CustomerId;
      console.log("🚀 ~ handleSubmit ~ import.meta.env.VITE_REACT_APP_COSTUMER_ID:", import.meta.env.VITE_REACT_APP_COSTUMER_ID)
    
      setJwt(token);
    
      setIsAuthenticated(true);
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usario"
              name="user"
              autoComplete="Usuario"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
}

export default SignIn;