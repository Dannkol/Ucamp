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
  Chip,
  useMediaQuery,
  Alert
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useTheme } from '@mui/material/styles';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Footer } from '../../footer/footer';

import { PreviewCourse } from '../../preview/previewCourse'

import '../../../fonts.css';

import Waves from '../../effects/waves.svg';
import { useNavigate } from 'react-router-dom';

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
    color: '#78D6C6',
    backgroundColor: 'white', // Cambia el color de fondo al pasar el cursor
    transition: 'background-color 1s ease',
    fontSize: '14.2px'
  }
}


const stylesText = {
  paper: {
    textAlign: 'center',
    color: 'black',
    borderRadius: '8px',
    boxShadow: '0 2px 0px rgba(0, 0, 0, 1)',
  },
  text: {
    fontSize: '24px', // Cambia el tamaño de fuente según tu preferencia
    fontWeight: 'bold', // Puedes ajustar el peso de la fuente
  },
};

const FileUpload = ({ typeUpdload }) => {
  const navigate = useNavigate();

  const [showalert, setShowAlert] = useState(false)

  const [user, setUser] = useState(false);

  const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

  useEffect(() => {
    // Realizamos la solicitud Axios dentro de useEffect
    axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/me`, { withCredentials: true })
      .then(response => {
        // Cuando la solicitud es exitosa, actualizamos el estado con los datos recibidos
        setUser(response.data.message);
      })
      .catch(error => {
        navigate('/login')
        // Manejar errores aquí si es necesario
        console.error(error);
      });
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [clase, setClase] = useState([]);
  const [readme, setReadme] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState(null);
  const [title, setTitle] = useState(null);
  const [curso, setCurso] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [optionscursos, setOptionsCursos] = useState([]);
  const [optionsclases, setOptionsClases] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);

  const handleOpenPrewieChange = (e) => {
    if (openPreview) {
      return setOpenPreview(false)
    }
    return setOpenPreview(true)
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClase(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/all/courses`, { withCredentials: true });
        const data = await response.data;
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
        const response = await axios(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/all/clases`, { withCredentials: true });
        const data = await response.data;
        setOptionsClases(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [])

  const handleCursoChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurso(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(event.target);
    console.log(optionscursos);
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


  const hooksPropsPreview = {
    clase,
    readme,
    file,
    text,
    title,
    curso,
    quiz,
    sheet,
    optionscursos,
    optionsclases,
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

    formData.append('tipo', typeUpdload);

    try {
      await axios.post(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      setShowAlert(true)
    } catch (error) {
      console.error('Error al subir el archivo y el texto:', error);
      alert('La clase no se ha podido crear.');
    }
  };

  const AnswerAlert = (answer) => {
    if (answer) {
      window.location.href = typeUpdload ? '/formulario/clases' : '/formulario/cursos';
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      {
        showalert && (
          <Alert
            action={
              <Box item style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <Button onClick={() => {AnswerAlert(true)}} variant="contained" color="inherit" size="small">
                  si
                </Button>
                <Button onClick={() => {AnswerAlert(false)}} variant="contained" color="inherit" size="small">
                  no
                </Button>
              </Box>
            }
          >
            {`Se creó la ${typeUpdload ? 'curso' : 'clase'} exitosamente. deseas crear ${typeUpdload ? 'una clase' : 'un curso'}?`}
          </Alert>
        )
      }
      <Grid container component="main" >
        <CssBaseline />
        {isMobile && (
          <Grid position='fixed' style={{
            margin: '10px',
            bottom: 0
          }}>
            <Box>
              <Button disabled={false}
                size="small"
                variant="large"
                onClick={handleOpenPrewieChange}
                style={{
                  backgroundColor: 'rgb(4, 13, 18)',
                  color: 'white',
                  fontSize: '12px',
                  width: '50px',
                  height: '50px',
                }}> {openPreview ? 'Cerrar' : 'Abrir'} Preview</Button>
            </Box>
          </Grid>
        )}
        {!isMobile || openPreview ? (
          <Grid item
            xs={(openPreview ? 12 : false)}
            md={(openPreview ? 12 : 8)}
            sm={(openPreview ? 12 : 8)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', // Alinea verticalmente al centro
              height: '100%',
              display: { xs: 'none', sm: 'block' }
            }}
            square
          >
            <Box
              sx={{
                height: '100vh',
                width: '100%',

                display: { xs: 'none', sm: 'block' },

                overflow: 'auto',
                display: 'flex', // Usar Flexbox
                flexDirection: 'column', // Columnas para alinear verticalmente
              }}

            >
              <PreviewCourse {...hooksPropsPreview} style={{ height: '100%', width: '100%', display: { xs: 'none', sm: 'block' } }} />
            </Box>
          </Grid>
        ) : (
          <Grid />
        )}

        {(openPreview && isMobile) ?

          <Grid />

          :
          <Grid item xs={isMobile ? 12 : false} sm={12} md={isMobile ? 0 : 4} component={Paper}
            style={
              {
                backgroundColor: '#bdcdd0',
                border: 'none',
                boxShadow: 'none'
              }
            }
            square>
            <Box
              sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                padding: '10px',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {!typeUpdload ?
                (
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
                        style={{ color: '#207178', backgroundColor: 'white', fontSize: '18px' }}
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
                      <FormControl sx={{ width: '100%' }}>
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
                    <Paper style={stylesText.paper} elevation={1} >
                      <FormControl fullWidth sx={{ p: 1 }} size="small">
                        <InputLabel id="demo-select-small-label">Curso*</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={curso}
                          label="Curso"
                          onChange={handleCursoChange}
                          sx={stylesText.paper}
                        >
                          {optionscursos.length ? optionscursos.map((option) => (
                            <MenuItem
                              key={option.id}
                              value={option.id}>
                              {option.curso}
                            </MenuItem>
                          )) : <MenuItem value="">
                            <em>None</em>
                          </MenuItem>}
                        </Select>
                      </FormControl>
                    </Paper>
                  </Grid>
                )
              }

              <Grid item xs={12} style={{
                marginBottom: '10px',
              }}>
                <Paper style={stylesText.paper} >
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
                  <Paper style={stylesText.paper} >
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
                  <Paper style={stylesText.paper} >
                    <TextField
                      label="Link del google sheet *"
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
                    style={{ color: '#207178', backgroundColor: 'white', fontSize: '18px' }}
                    sx={hoveredButton}
                    startIcon={<CloudUploadIcon />}
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
                  style={{ color: '#207178', backgroundColor: 'white', fontSize: '18px' }}
                  sx={hoveredButton}
                  className='titleClassUpload'
                >
                  Crear clase
                </Button>
              </Grid>
            </Box>
          </Grid>
        }
        <Grid item xs={12} >
          <Footer sx={{ mt: 0.2 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FileUpload;
