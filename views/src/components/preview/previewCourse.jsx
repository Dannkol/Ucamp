import React, { useState, useEffect, useRef } from 'react';

import PreviewImg from './preview.png'

import animationFloting from './preview.css'


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
    Card,
    CardActions,
    CardContent,
    Avatar,
    Chip,
    CircularProgress
} from '@mui/material';

import axios from 'axios';

import ReactMarkdown from 'react-markdown';

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)


function areArraysEqual(arr1, arr2) {
      
      // Función para ordenar array1 según el orden de orderArray
      arr2 = arr1.sort((a, b) => {
        const indexOfA = arr2.indexOf(a._id);
        const indexOfB = arr2.indexOf(b._id);
        console.log(indexOfA - indexOfB);
        // Comparar los índices para determinar el orden
        return indexOfA - indexOfB;
      });
      
      console.log(arr2);

      return arr2;
}

export function PreviewCourse(props) {
    const videoRef = useRef(null);
    const [forceReload, setForceReload] = useState(false);
    const { id, title, filevideo, textclass, titleclass, file, curso, clase, readme, text, quiz, sheet, tipo, ChangeClass } = props;

    const [owner, setOwner] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard/info/user`, { withCredentials: true });
                const data = response.data.message;
                const idcourses = data.courses.map(course => course._id);
                setOwner(idcourses.includes(id));
            } catch (error) {
                navigate('/login');
            }
        }

        fetchData();
    }, [id]);

    const [shouldHideDiv, setShouldHideDiv] = useState(false);

    useEffect(() => {
        if (textclass || titleclass || title || file || clase?.length > 0 || clase?.length > 0 || readme || text || quiz || sheet) {
            setShouldHideDiv(true);
        } else {
            setShouldHideDiv(false);
        }
    }, [title, filevideo, textclass, titleclass, file, curso, clase, readme, text, quiz, sheet]);

    const [markdownContent, setMarkdownContent] = useState('');
    const [markdownContentText, setMarkdownContentText] = useState('');

    const [videoUrl, setVideoUrl] = useState(null);
    useEffect(() => {
        if (file) {
            const videoURL = URL.createObjectURL(file);
            console.log(videoURL);
            setVideoUrl(videoURL);
            setForceReload(!forceReload);
        } else if (filevideo) {
            console.log(filevideo);
            setVideoUrl(filevideo);
            setForceReload(!forceReload);
        }

    }, [file, filevideo]);

    const [fetchclase, setFetchclase] = useState([])

    useEffect(() => {
        if (readme) {
            if (!tipo) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setMarkdownContent(e.target.result); // Actualizar el estado con el contenido del archivo Markdown
                };
                reader.readAsText(readme);
            } else {
                async function fetchData() {
                    try {
                        const response = await axios.get(readme);
                        const text = response.data;
                        setMarkdownContent(text);
                    } catch (error) {
                        console.log('err');
                        console.error('Error al descargar el archivo:', error);
                    }
                }
                fetchData();
            }
        }
    }, [readme]);


    useEffect(() => {
        if (text) {
            setMarkdownContentText(text); // Establece el contenido de Markdown directamente
        }
    }, [text]);


    useEffect(() => {
        if (textclass) {
            setMarkdownContentText(textclass); // Establece el contenido de Markdown directamente
        }
    }, [textclass]);

    useEffect(() => {
        async function fetchData() {
            try {
                const post = {
                    clases: clase
                }
                ///all/content/clases
                let data = []
                if (post.clases !== undefined) {
                    const response = await axios.post(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/all/content/clases`, post, { withCredentials: true });
                    data = await response.data;
                    console.log(data, clase);
                    return setFetchclase((areArraysEqual(data, clase)))
                }
                return setFetchclase(data);
                // Almacena la respuesta en el estado fethclase
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, [clase]);

    const markdownStyles = {
        img: {
            maxWidth: '95%', // Limita el ancho máximo de las imágenes al 100%
            height: 'auto',   // Permite que la altura se ajuste automáticamente
        },
        code: {
            backgroundColor: '#f3f3f3', // Color de fondo para resaltar el código
            padding: '4px 8px',        // Espaciado interno para el código
            borderRadius: '4px',       // Bordes redondeados
            fontFamily: 'monospace',   // Fuente monoespaciada para el código
            overflowX: 'auto',         // Desplazamiento horizontal si el código es largo
        }
    };

    const markdownContainerStyles = {
        display: { xs: 'none', sm: 'flex' },
        flexdirection: 'column',
        gap: 10,
        fontFamily: 'Fira Code, monospace',
        maxHeight: '100%', overflowY: 'auto', maxWidth: '100%', padding: '10px'
    };

    const stylesText = {
        paper: {
            textAlign: 'center',
            color: 'black', // Cambia el color de texto según tu preferencia
            background: '#f5f5f5', // Cambia el color de fondo según tu preferencia
            borderRadius: '8px', // Añade bordes redondeados si lo deseas
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Añade una sombra suave
        },
        text: {
            wordWrap: 'break-word',
            fontSize: '24px', // Cambia el tamaño de fuente según tu preferencia
            fontWeight: 'bold', // Puedes ajustar el peso de la fuente
        },
    };

    const handleChangeOptionsClases = (options) => {
        setOptionsClases(options);
    }

    return (

        <div style={markdownContainerStyles}>
            {(!tipo) && (
                <Grid>
                    <h2>Vista previa</h2>
                    <hr></hr>
                </Grid>
            )}
            {shouldHideDiv ? null : (
                <Grid item align="center">
                    <Avatar alt="Preview" sx={{ width: '80%', height: 'auto' }} className="floating-image" src={PreviewImg} />
                </Grid>
            )}
            <Grid item align="center">
                <Paper style={stylesText.paper} elevation={3} xs={12} >
                    <Typography style={stylesText.text}>
                        {title ? title : titleclass}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item align="center" elevation={3} mt={2}>
                <Box>
                    {videoUrl && (
                        <video
                            key={forceReload}
                            ref={videoRef}
                            style={{
                                width: '100%',
                                height: 'auto',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            }}
                            controls
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Tu navegador no admite la reproducción de videos.
                        </video>
                    )}
                </Box>
            </Grid>
            <Box

                style={
                    {
                        width: '100%',
                        overflow: 'auto',
                        whiteSpace: 'nowrap',
                        padding: '12px'
                    }
                }
            >
                {
                    (fetchclase) ?
                        (fetchclase.map((value, index) => (
                            <Card sx={{ margin: '12px', display: 'inline-block', width: '275px', maxHeight: 350, borderBottom: '1px solid black', borderLeft: '1px solid black' }} style={stylesText.paper} >
                                <CardContent>
                                    <Typography variant="h5" style={{ wordWrap: 'break-word' }} component="div">
                                        {value.classes.title}
                                    </Typography>
                                    <Box
                                        style={{
                                            width: 'auto', // Cambié 'auto' a '100%' para ocupar todo el ancho disponible
                                            maxHeight: '150px', // Establecí una altura máxima para limitar el tamaño de la box
                                            overflow: 'auto',

                                        }}
                                    >
                                        <Typography variant="body2" style={{
                                            fontSize: '18px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                        }} color="text.secondary">
                                            Resumen: {value.classes.summary}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Fecha de actualización: {new Date(value.classes.update_date).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => ChangeClass(index)} size="small">Ver</Button>
                                </CardActions>
                            </Card>

                        )))
                        :
                        (
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <CircularProgress color='inherit' />
                            </Box>
                        )

                }
            </Box>
            <Grid item align="center" style={{
                marginBottom: 12
            }}>
                {text || textclass ? (
                    <Grid>
                        <Typography variant='h5' sx={{
                            textAlign: 'start',
                        }}>
                            Resumen
                            <hr></hr>
                            <ReactMarkdown style={{
                                textAlign: 'start',
                            }} components={
                                {
                                    img: ({ ...props }) => <img {...props} style={markdownStyles.img} />,
                                    pre: ({ ...props }) => <pre {...props} style={markdownStyles.code} />,
                                }
                            }>
                                {
                                    markdownContentText
                                }
                            </ReactMarkdown>
                        </Typography>



                    </Grid>

                ) : (<Grid />)}
            </Grid >
            {markdownContent ? (
                <ReactMarkdown components={
                    {
                        img: ({ ...props }) => <img {...props} style={markdownStyles.img} />,
                        pre: ({ ...props }) => <pre {...props} style={markdownStyles.code} />,
                    }
                }>
                    {markdownContent}
                </ReactMarkdown>
            ) :
                (<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <CircularProgress color='inherit' />
                </Box>)}
            <Grid item style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: '10px'
            }}>
                {quiz ? (<Button
                    disabled={false}
                    size="small"
                    variant="large"
                    style={{
                        backgroundColor: 'rgb(4, 13, 18)',
                        color: 'white'
                    }}
                    href={`${quiz}`}
                > Quiz </Button>) : <Box />}
                {((sheet && !tipo) || owner) ? (<Button
                    disabled={false}
                    size="small"
                    variant="large"
                    style={{
                        backgroundColor: 'rgb(4, 13, 18)',
                        color: 'white'
                    }}
                    href={`${sheet}`}
                > Sheet </Button>) : <Box />}
                {id && (<Button
                    disabled={false}
                    size="small"
                    variant="large"
                    style={{
                        backgroundColor: 'rgb(4, 13, 18)',
                        color: 'white'
                    }}
                    onClick={async () => {
                        const data = await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/addmylist/${id}`, { withCredentials: true })
                        console.log(data);
                    }}
                > mylist </Button>)}
            </Grid>

        </div>
    );

}
