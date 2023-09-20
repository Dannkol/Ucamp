import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid, Typography } from '@mui/material';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);

    try {
      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Archivo y texto subidos correctamente.');
    } catch (error) {
      console.error('Error al subir el archivo y el texto:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Crea una nueva clase
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            >
              Seleccionar Video
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            value={text}
            rows={6}
            onChange={handleTextChange}
            style={{ minHeight: '200px' }} // Establece la altura mínima a 200px
          />

        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpload}
          >
            Subir Archivo y Texto
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FileUpload;
