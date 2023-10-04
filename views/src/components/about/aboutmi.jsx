import React, { useState, useEffect } from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider, Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Container, Typography, Avatar, Paper, Grid, Button, createTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();

const hoveredButton = {
    '&:hover': {
        color: '#78D6C6',
        backgroundColor: 'white', // Cambia el color de fondo al pasar el cursor
        transition: 'background-color 1s ease',
        fontSize: '14.2px'
    }
}

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

const UserProfile = (poprs) => {

    const username = poprs.user.username

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    console.log(poprs.user);
    return (
        <ThemeProvider theme={defaultTheme}>

            <Grid container component="main" style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '18px'
            }}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Avatar
                                {...stringAvatar(`${username}`)}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    fontSize: '60px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography variant="h4">{poprs.user.username}</Typography>
                            <Typography variant="subtitle1">Correo Electrónico: {poprs.user.email}</Typography>
                            <Typography variant="subtitle1">points: {poprs.user.points}</Typography>
                            <Typography variant="subtitle1">{poprs.user.rol === 0 ? 'Creador de cursos' : 'Standar'}</Typography>

                            <Dialog
                                open={openModal}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">Acepto terminos y condiciones para ser creador de cursos</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Estas aceptando los terminos y condiciones de la comunidad de campuslands, el contenido y demas realcionado a los cursos creados es tu responsabilidad y se encuentra bajo las leyes de campuslands y del gobierno colombiano
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={async () => {
                                        try {
                                            const uploadrol = await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard/update/rol`, { withCredentials: true })
                                            if( uploadrol.status === 200) {
                                                navigate('/formulario/cursos')
                                            } else {
                                                alert('Error en el servidor recarge la pagina')
                                            }
                                        } catch (error) {
                                            console.log(error);
                                        }

                                    }} color="primary">
                                        Aceptar
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Cerrar
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Box xs={12}>
                                <Button
                                    variant="outlined"
                                    component="span"
                                    fullWidth
                                    style={{ color: '#207178', backgroundColor: 'white', fontSize: '18px', marginBottom: '10px' }}
                                    sx={hoveredButton}
                                    onClick={() => {
                                        console.log(poprs.user.rol == 0);
                                        if (poprs.user.rol != 0) {
                                            handleClickOpen();
                                        } else {
                                            navigate('/formulario/cursos')
                                        }
                                        ;
                                    }}
                                > Crear Nuevo Curso </Button>
                                {
                                    (poprs.user.courses.length > 0) && (
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            fullWidth
                                            style={{ color: '#207178', backgroundColor: 'white', fontSize: '18px' }}
                                            sx={hoveredButton}
                                            onClick={() => navigate('/formulario/clases')}
                                        > Crear Nueva Clase </Button>
                                    )
                                }

                            </Box>

                        </Grid>
                    </Grid>
                </Paper>

            </Grid>
        </ThemeProvider>
    );
};

export default UserProfile;
