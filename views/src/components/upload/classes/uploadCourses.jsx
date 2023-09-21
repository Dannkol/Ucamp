import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

import '../../../fonts.css';

import Waves from '../../effects/waves.svg';

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)


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
const defaultTheme = createTheme();

const hoveredButton = {
  '&:hover': {
    backgroundColor: '#F5FCCD ', // Cambia el color de fondo al pasar el cursor
    transition: 'background-color 1s ease',
    fontSize: '14.2px'
  }
}

const backgroundPattern = {
  backgroundColor: '#F5FCCD',
  opacity: '0.8',
  backgroundImage: `url(${Waves})`, // Utiliza el componente SVG importado
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh'
}

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setText(e.target.title);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);

    try {
      await axios.post(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Se creo la clase exitosamente.');
    } catch (error) {
      console.error('Error al subir el archivo y el texto:', error);
      alert('La clase no se ha podido crear.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={backgroundPattern} style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '95vh',

        }
      }>
        <Typography variant="h5" align="center" sx={
          {
            backgroundColor: 'white',
            border: '10px solid #e5e5e5',
          }
        } className='titleClassUpload' gutterBottom>
          Crea una nueva clase
        </Typography>
        <Grid container spacing={2} xs={10} md={6} >
          <Grid item xs={12} style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              id="file-input"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                
                style={{ color: 'white', backgroundColor: '#78D6C6' , fontSize : '20px', margin : '0 auto' }}
                sx={hoveredButton}
                className='titleClassUpload'
              >
                Seleccionar Video *
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} >
            <TextField
              label="Titulo *"
              variant="outlined"
              fullWidth
              value={text}
              onChange={handleTitleChange}
              sx={
                {
                  backgroundColor: 'white',
                  border: '10px solid #e5e5e5'
                }
              }
            />

          </Grid>
          <Grid item xs={12} >
            <TextField
              label="Content *"
              variant="outlined"
              fullWidth
              multiline
              title={text}
              rows={8}
              onChange={handleTextChange}
              sx={
                {
                  backgroundColor: 'white',
                  border: '10px solid #e5e5e5'
                }
              }
            />

          </Grid>
          <Grid item xs={12} style={{
            display: 'flex',
            justifyContent: 'center'
          }} >
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              id="file-input"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={{ color: 'white', backgroundColor: '#78D6C6', fontSize: '26px' }}
                sx={hoveredButton}
                className='titleClassUpload'
              >
                Subir readme
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} style={{
            display: 'flex',
            justifyContent: 'center'
          }} >
            <Button
              color="primary"
              onClick={handleUpload}
              style={{ color: 'white', backgroundColor: '#78D6C6', fontSize: '26px' }}
              sx={hoveredButton}
              className='titleClassUpload'
            >
              Crear clase
            </Button>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Grid>
    </ThemeProvider>

  );
};

export default FileUpload;
