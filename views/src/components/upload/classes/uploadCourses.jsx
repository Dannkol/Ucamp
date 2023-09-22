import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  OutlinedInput,
  Chip
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Footer } from '../../footer/footer';

import '../../../fonts.css';

import Waves from '../../effects/waves.svg';

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)



const defaultTheme = createTheme();


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


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

const stylesText = {
  paper: {
    padding: '16px', // Utiliza el mismo espaciado que theme.spacing(2) si lo deseas
    textAlign: 'center',
    color: 'black', // Cambia el color de texto según tu preferencia
    background: '#f5f5f5', // Cambia el color de fondo según tu preferencia
    borderRadius: '8px', // Añade bordes redondeados si lo deseas
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Añade una sombra suave
  },
  text: {
    fontSize: '24px', // Cambia el tamaño de fuente según tu preferencia
    fontWeight: 'bold', // Puedes ajustar el peso de la fuente
  },
};

const FileUpload = ({ typeUpdload }) => {
  const theme = useTheme();
  const [clase, setClase] = useState([]);
  const [readme, setReadme] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [curso, setCurso] = useState('');
  const [quiz, setQuiz] = useState('');
  const [sheet, setSheet] = useState('');
  const [optionscursos, setOptionsCursos] = useState([]);
  const [optionsclases, setOptionsClases] = useState([]);



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClase(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/all/courses`);
        const data = await response.json();
        setOptionsCursos(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/all/clases`);
        const data = await response.json();
        setOptionsClases(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [])

  const handleCursoChange = (event) => {
    setCurso(event.target.value);
  };

  const handleQuizChange = (event) => {
    setQuiz(event.target.value);
  };

  const handleSheetChange = (event) => {
    setSheet(event.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'mp4') {
        alert('Selecciona un archivo con extensión .mp4 (video).');
        e.target.files = '';
      } else {
        setFile(selectedFile);
      }
    }

  };

  const handleReadmeChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'md') {
        // Muestra una alerta si la extensión no es .md
        alert('Selecciona un archivo con extensión .md (Markdown).');
        e.target.files = ''; // Borra la selección no válida
      } else {
        // El archivo cumple con la condición, puedes continuar con su procesamiento
        // ...
        setReadme(selectedFile);
      }
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    let linksquiz = [];

    if (typeUpdload) {
      formData.append('resumen', text);
      formData.append('title', title);
      formData.append('readme', readme);
      formData.append('clases', JSON.stringify(clase));
      const regexquiz = /^https:\/\/docs\.google\.com\/forms\/d\/[a-zA-Z0-9_-]+(\/viewform)?/;

      if (quiz && regexquiz.test(quiz)) {
        linksquiz.push(quiz);
      } else {
        return alert('Por favor, verifique que sea un enlace de Google Form');
      }

      const regexsheet = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9_-]+\/edit(\?usp=sharing)?/;

      if (sheet && regexsheet.test(sheet)) {
        linksquiz.push(sheet);
      } else {
        return alert('Por favor, verifique que sea un enlace de Google Sheets');
      }
      formData.append('quiz', JSON.stringify(linksquiz));
      
    } else {
      formData.append('file', file);
      formData.append('resumen', text);
      formData.append('title', title);
      formData.append('curso', curso);
      formData.append('readme', readme);
    }


    console.log(formData);
    try {
      await axios.post(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Se creó la clase exitosamente.');
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
          height: '100%',
          gap: '40px',
          padding: '50px'
        }
      }>
        <Grid item align="center">
          <Paper style={stylesText.paper} elevation={3} >
            <Typography style={stylesText.text}>
              {typeUpdload ? ('Crea un nuevo curso') : ('Crea una nueva clase')}
            </Typography>
          </Paper>
        </Grid>
        <Grid container spacing={2} xs={10} md={6} >
          {!typeUpdload ?
            (
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
                    style={{ color: 'white', backgroundColor: '#78D6C6', fontSize: '18px' }}
                    sx={hoveredButton}
                    className='titleClassUpload'
                  >
                    Seleccionar Video
                  </Button>
                </label>
              </Grid>
            ) :
            (<Grid />)
          }

          <Grid item xs={12} >
            <Paper style={stylesText.paper} elevation={3} >
              <TextField
                label="Titulo *"
                variant="outlined"
                fullWidth
                value={title}
                onChange={handleTitleChange}
              />
            </Paper>
          </Grid>


          {
            typeUpdload ? (
              <Grid item xs={12}>
                <Paper style={stylesText.paper} elevation={3} >
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Clases</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={clase}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="clases" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={optionsclases.map((nombre) => {
                              if (nombre.id === value) return nombre.clase;
                            })} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {optionsclases.map((data) => (
                        <MenuItem
                          key={data.id}
                          value={data.id}
                          style={getStyles(data.clase, clase, theme)}
                        >
                          {data.clase}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ m: 1 }} size="small">
                  <InputLabel id="demo-select-small-label">Curso</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={curso}
                    label="Curso"
                    onChange={handleCursoChange}
                    sx={stylesText.paper}
                  >
                    {optionscursos.length ? optionscursos.map((option) => (
                      <MenuItem key={option.id} value={option.curso}>
                        {option.curso}
                      </MenuItem>
                    )) : <MenuItem value="">
                      <em>None</em>
                    </MenuItem>}
                  </Select>
                </FormControl>
              </Grid>
            )
          }

          <Grid item xs={12} >
            <Paper style={stylesText.paper} elevation={3} >
              <TextField
                label="Resumen *"
                variant="outlined"
                fullWidth
                multiline
                title={text}
                rows={8}
                onChange={handleTextChange}
              />
            </Paper>
          </Grid>
          {typeUpdload ? (
            <Grid item xs={12}>
              <Paper style={stylesText.paper} elevation={3} >
                <TextField
                  label="Link de quiz *"
                  variant="outlined"
                  fullWidth
                  value={quiz}
                  onChange={handleQuizChange}
                />
              </Paper>
            </Grid>

          ) : (
            <Grid> </Grid>
          )}
          {typeUpdload ? (
            <Grid item xs={12}>
              <Paper style={stylesText.paper} elevation={3} >
                <TextField
                  label="Link del goole sheet *"
                  variant="outlined"
                  fullWidth
                  value={sheet}
                  onChange={handleSheetChange}
                />
              </Paper>
            </Grid>

          ) : (
            <Grid> </Grid>
          )}
          <Grid item xs={12} style={{
            display: 'flex',
            justifyContent: 'center'
          }} >
            <input
              type="file"
              style={{ display: 'none' }}
              id="readme-input"
              onChange={handleReadmeChange}
            />
            <label htmlFor="readme-input">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={{ color: 'white', backgroundColor: '#78D6C6', fontSize: '18px' }}
                sx={hoveredButton}
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
              style={{ color: 'white', backgroundColor: '#78D6C6', fontSize: '18px' }}
              sx={hoveredButton}
              className='titleClassUpload'
            >
              Crear clase
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} >

        <Footer sx={{ mt: 0.2 }} />
      </Grid>
    </ThemeProvider>

  );
};

export default FileUpload;
