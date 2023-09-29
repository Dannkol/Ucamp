import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserProfile from "../about/aboutmi";

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
    createTheme,
    CircularProgress,
    Paper
} from '@mui/material'

import Accordeon from '../inicio/accordion';


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

    const [user, setUser] = useState([]);
    const [userinfo, setUserInfo] = useState({});
    const [cursosinfo, setCursosInfo] = useState({});


    const [login, setLogin] = useState(false);

    const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)



    useEffect(() => {
        axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/me`, { withCredentials: true })
            .then(response => {
                setLogin(response.data.message);
            })
            .catch(error => {
                navigate('/login')
            });
    }, []);

    useEffect(() => {
        async function fetchData() {

            try {
                const response = await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard/info/user`, { withCredentials: true })
                const data = await response.data.message
                return setUser(data);
            } catch (error) {
                navigate('/login')
            }

        }
        fetchData()
    }, []);

    useEffect(() => {
        setUserInfo({
            id: user.id,
            username: user.username,
            email: user.email,
            rol: user.rol,
            points: user.points
        })
    }, [user])


    useEffect(() => {
        const misCursos = []

        const learning = []

        user.courses.forEach(element => {
            misCursos.push(
                {
                    title: element.title,
                    summary: element.summary
                }
            )
        });

        user.courses.forEach(element => {
            learning.push(
                {
                    title: element.title,
                    summary: element.summary
                }
            )
        });



        const data = [
            {
                title: 'Cursos Generales', cards: [{
                    title: 'Cursos de la comunidad 1',
                    summary: 'Cursos de la comunidad lorem inpusdasdasdasdasd'
                }, {
                    title: 'Cursos de la comunidad 2',
                    summary: 'Cursos de la comunidad lorem inpusdasdasdasdasd'
                }, {
                    title: 'Cursos de la comunidad 3',
                    summary: 'Cursos de la comunidad lorem inpusdasdasdasdasd'
                }, {
                    title: 'Cursos de la comunidad 4',
                    summary: 'Cursos de la comunidad lorem inpusdasdasdasdasd'
                }]
            },
            {
                title: 'Cursos de la comunidad', cards: [{
                    title: 'Cursos de la comunidad 1',
                    summary: 'Cursos de la comunidad lorem inpusdasdasdasdasd'
                }, {
                    title: 'Cursos de la comunidad',
                    summary: 'Cursos de la comunidad lorem inpusdasdasdasdasd'
                }]
            },
            {
                title: 'Mi lista', cards: learning
            },
            {
                title: 'Mis cursos', cards: misCursos
            },
        ];
    }, [user]);



    return (
        <ThemeProvider theme={defaultTheme}>
            {login ? ( // Verificamos si user tiene datos antes de mostrarlos
                <Grid container
                >
                    <Box item style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',

                    }}>
                        {
                            userinfo.id !== undefined && (
                                <Box>
                                    <UserProfile user={userinfo} />
                                    <Accordeon data={[]} />
                                </Box>

                            )
                        }

                        {
                            userinfo.id == undefined && (


                                <Grid container component="main" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    gap: '18px',
                                    flexDirection: 'column',
                                }}>
                                    <Box item>
                                        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                                            <CircularProgress />
                                        </Paper>
                                    </Box>
                                    <Box item>
                                        <Typography align="center">
                                            Renderizando
                                        </Typography>
                                    </Box>

                                </Grid>

                            )
                        }
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
