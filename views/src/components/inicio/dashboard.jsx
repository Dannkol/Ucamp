import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    Grid,
    LinearProgress,
    Stack,
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    ThemeProvider,
    createTheme
} from '@mui/material'


const defaultTheme = createTheme();

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

export default function Dashboard() {
    const navigate = useNavigate();

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

    return (
        <ThemeProvider theme={defaultTheme}>
            {user ? ( // Verificamos si user tiene datos antes de mostrarlos
                <Grid container style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'between',
                    alignItems: 'start',
                    gap: '12px'
                }}

                >
                    <Box item>
                        <Card sx={{ margin : '12px', display: 'inline-block', width: '275px', maxHeight: 350, borderBottom: '1px solid black', borderLeft: '1px solid black' }} style={stylesText.paper} >
                            <CardContent>
                                <Typography variant="h5" style={{ wordWrap: 'break-word' }} component="div">
                                    Title
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
                                        Resumen:
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Fecha de actualización:
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => console.log('click')} size="small">Ver</Button>
                            </CardActions>
                        </Card>
                    </Box>
                    <Box item>
                        <Card sx={{ margin: '12px', display: 'inline-block', width: '275px', maxHeight: 350, borderBottom: '1px solid black', borderLeft: '1px solid black' }} style={stylesText.paper} >
                            <CardContent>
                                <Typography variant="h5" style={{ wordWrap: 'break-word' }} component="div">
                                    Title
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
                                        Resumen:
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Fecha de actualización:
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => console.log('click')} size="small">Ver</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            ) : (

                <Grid container style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh', // Esto asegura que ocupe al menos el 100% de la altura de la pantalla
                }}

                >
                    <Stack sx={{ width: '80%', color: 'rgb(15, 125, 126)' }} spacing={2}>
                        <LinearProgress color="inherit" />
                    </Stack>
                </Grid>
            )}
        </ThemeProvider>
    );
}
