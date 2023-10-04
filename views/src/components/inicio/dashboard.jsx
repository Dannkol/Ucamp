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

    const [update , setUpdates] = useState(false)

    const [user, setUser] = useState([]);
    const [userinfo, setUserInfo] = useState({});
    const [cursosinfo, setCursosInfo] = useState([]);
    const [cursosinfocomunidad, setCursosInfoComunidad] = useState([]);

    const [mylist, setMyList] = useState([]);

    const [cursosinfoGeneral, setCursosInfoGeneral] = useState([]);

    const [login, setLogin] = useState(false);

    const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

    const changeUpdate = () => {
        setUpdates((prevUpdate) => !prevUpdate);
        window.location.reload(true);
    }

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
                const response = await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard/info/user`, { withCredentials: true });
                const data = response.data.message;
                setUser(data);
            } catch (error) {
                navigate('/login');
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        async function fetchDataCourse() {
            try {
                const response = await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard/all/course`, { withCredentials: true });
                const data = await response.data;
                const courses = []
                data.forEach(element => {
                    element.courses.forEach(item => {
                        courses.push({
                            id: item._id,
                            title: item.title,
                            summary: item.summary,
                        });
                    });

                });
                setCursosInfoComunidad(courses)

            } catch (error) {
                console.error(error);
            }
        }
        fetchDataCourse()
    }, [user,update]);

    useEffect(() => {
        async function fetchDataCourse() {
            try {
                const response = await axios.get(`http://192.168.128.23:5010/cursos/all`);
                const data = await response.data;
                const courses = []
                data.forEach(item => {
                    
                    courses.push({
                        id: item.folder,
                        img: item.imagenCourse,
                        title: item.nameCourse,
                        summary: item.nameCourse,
                    });
                });
                setCursosInfoGeneral(courses)

            } catch (error) {
                console.error(error);
            }
        }
        fetchDataCourse()
    }, [user,update]);

    useEffect(() => {
        async function fetchDataMyList() {
            try {
                const response = await axios.post(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard/mylist`, {
                    params: {
                        mylist: user.learning.courses
                    },

                }, { withCredentials: true });
                const data = response.data;
                const courses = [];

                data.forEach(element => {
                    element.courses.forEach(item => {
                        courses.push({
                            id: item._id,
                            title: item.title,
                            summary: item.summary,
                        });
                    });
                });

                setMyList(courses);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDataMyList();
    }, [user,update]);

    useEffect(() => {
        const misCursos = [];
        const learning = [];


        if (user && user.courses) {
            user.courses.forEach((element) => {
                misCursos.push({
                    id: element._id,
                    title: element.title,
                    summary: element.summary,
                });
            });


        }

        setCursosInfo([
            {
                title: 'Cursos Generales',
                cards: cursosinfoGeneral,
            },
            {
                title: 'Cursos de la comunidad',
                cards: cursosinfocomunidad,
            },
            {
                title: 'Mi lista',
                cards: mylist,
            },
            {
                title: 'Mis cursos',
                cards: misCursos,
            },
        ])

    }, [user, cursosinfocomunidad, mylist, cursosinfoGeneral,update]);


    useEffect(() => {
        setUserInfo({
            id: user.id,
            username: user.username,
            email: user.email,
            rol: user.rol,
            points: user.points,
            courses : user.courses
        })
    }, [user])

    return (
        <ThemeProvider theme={defaultTheme}>
            {login ? ( // Verificamos si user tiene datos antes de mostrarlos
                <Grid container
                >

                    {
                        userinfo.id !== undefined && (
                            <Box item style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '12px',
                                flexWrap: 'wrap',
                                width: '100%',
                            }}>

                                <UserProfile user={userinfo} />
                                <Accordeon data={cursosinfo} onChangeUpdate={changeUpdate} />
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
