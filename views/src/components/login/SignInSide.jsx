import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://dannkol.github.io/portafolios/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

export default function SignInSide() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const popup = window.open(
      `http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/auth/discord`,
      "targetWindow",
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      width=520,
      height=600`
    );

    window.addEventListener('message', (event) => {
      // Verificar el origen del mensaje si es necesario
      console.log(event);
      if (event.origin === 'http://localhost:5101') {
        // Acceder al mensaje recibido
        const message = event.data;
        console.log(message);

        // Si el mensaje es igual a true, cierra la ventana popup
        if (message === true) {
          popup.close();
          navigate('/')
        }
      }


    });
    return;
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={6} md={5} component={Paper} sx={{
          backgroundColor: '#EBE4D1'
        }} square>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, width: 150, height: 150 }} src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png">
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Discord
              </Button>
              {/*               <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleFetch}
              >
                fetch
              </Button> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}