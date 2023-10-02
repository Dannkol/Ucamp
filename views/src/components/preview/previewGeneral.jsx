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

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

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


export function PreviewGeneral(props) {
    
    const { tipo, titulocursodefault, seccionescursodefault, optionsclasesdefault, ChangeClassDefaul } = props;


    const [shouldHideDiv, setShouldHideDiv] = useState(false);
    useEffect(() => {
        if (true
            ) {
            setShouldHideDiv(true);
        } else {
            setShouldHideDiv(false);
        }
    }, []);

    console.log(optionsclasesdefault);

    return (
        <div style={markdownContainerStyles}>
            {shouldHideDiv ? null : (
                <Grid item align="center">
                    <Avatar alt="Preview" sx={{ width: '80%', height: 'auto' }} className="floating-image" src={PreviewImg} />
                </Grid>
            )}
            <Grid item align="center">
                <Paper style={stylesText.paper} elevation={3} xs={12} >
                    <Typography style={stylesText.text}>
                        tt
                    </Typography>
                </Paper>
            </Grid>
        </div>

    );

}
