import React, { useState, useEffect, useRef } from 'react';

import PreviewImg from './preview.png'

import animationFloting from './preview.css'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BasicTabs from './tap'; 

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
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Link
} from '@mui/material';

import axios from 'axios';

import ReactMarkdown from 'react-markdown';


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

    const videoRef = useRef(null);

    const { ChangeClassDefaul, tipo, videoUrlGeneral, nombreDelCurso, titulocursodefault, seccionescursodefault, optionsclasesdefault, ChangeClassVideoDefaul } = props;


    const [shouldHideDiv, setShouldHideDiv] = useState(false);
    useEffect(() => {
        if (optionsclasesdefault || seccionescursodefault || titulocursodefault) {
            setShouldHideDiv(true);
        } else {
            setShouldHideDiv(false);
        }
    }, [optionsclasesdefault, nombreDelCurso, videoUrlGeneral, seccionescursodefault, titulocursodefault]);



    const ChangeClassDefault = (sectionIndex, videoIndex) => {
        const numeroDeSeccion = [sectionIndex, videoIndex];
        if (numeroDeSeccion !== null && seccionescursodefault.length > 0) {

            const [sectionIndex, videoIndex] = numeroDeSeccion;

            const video = seccionescursodefault[sectionIndex].videos[videoIndex];

            ChangeClassDefaul(video)

            if (video && video.video) {
                ChangeClassVideoDefaul(`http://192.168.128.23:5010/cursos/play?course=${nombreDelCurso}&seccion=${sectionIndex + 1}&video=${video.video}`);
            } else {
                ChangeClassVideoDefaul(null);
            }
        }
    };

    useEffect(() => {
        // Cuando videoUrlGeneral cambia, carga el nuevo video si existe
        if (videoUrlGeneral) {
            if (videoRef.current) {
                videoRef.current.load();
            }
        }
    }, [videoUrlGeneral]);

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
                        {console.log('ddd', optionsclasesdefault)}
                        {nombreDelCurso && nombreDelCurso}
                        {optionsclasesdefault && ' - ' + optionsclasesdefault.Titulo}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item style={{
                marginTop: '20px',
            }}>
                {
                    (seccionescursodefault && !tipo) && (
                        seccionescursodefault.map((section, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{section.sectionName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {section.videos.map((video, vIndex) => (
                                            <Paper key={vIndex} style={{ marginBottom: '15px', padding: '8px' }}>
                                                <li >
                                                    <Typography variant="body1">{video.Titulo}</Typography>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        style={{ color: '#207178', backgroundColor: 'white', fontSize: '12px' }}
                                                        onClick={() => {
                                                            ChangeClassDefault(index, vIndex);
                                                        }}
                                                    >
                                                        Ver Más
                                                    </Button>
                                                </li>
                                            </Paper>

                                        ))}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )
                }
            </Grid>
            <Grid item align="center" elevation={3} mt={2}>
                <Box>
                    {(videoUrlGeneral && tipo) && (
                        <video
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
                            <source src={videoUrlGeneral} type="video/mp4" />
                            Tu navegador no admite la reproducción de videos.
                        </video>
                    )}
                </Box>
            </Grid>
            <Grid item align="center" elevation={3} mt={2}>
                <Box>
                    {(optionsclasesdefault && optionsclasesdefault.links) && (
                        optionsclasesdefault.links.map((link, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{link["titulo-link"]}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Paper style={{ marginBottom: '15px', padding: '8px', overflowX:'auto' }}>
                                        <Link href={link.link} underline="none">
                                            {link.link}
                                        </Link>
                                    </Paper>



                                </AccordionDetails>
                            </Accordion>

                            /* seccion 5 temas puntuales */
                        ))
                    )}
                </Box>
            </Grid>
            <Grid item align="center" elevation={3} mt={2}>
                <Box>
                    {(optionsclasesdefault && optionsclasesdefault.Texto) && (

                        <ReactMarkdown style={{
                            textAlign: 'start',
                        }} components={
                            {
                                h1: ({ ...props }) => <h1 {...props} style={{ fontSize: '0.875rem' }} />,
                                h2: ({ ...props }) => <h2 {...props} style={{ fontSize: '0.875rem' }} />,
                                h3: ({ ...props }) => <h3 {...props} style={{ fontSize: '0.875rem' }} />,
                                h4: ({ ...props }) => <h4 {...props} style={{ fontSize: '0.875rem' }} />,
                                h5: ({ ...props }) => <h5 {...props} style={{ fontSize: '0.875rem' }} />,
                                h6: ({ ...props }) => <h6 {...props} style={{ fontSize: '0.875rem' }} />,
                                img: ({ ...props }) => <img {...props} style={markdownStyles.img} />,
                                pre: ({ ...props }) => <pre {...props} style={markdownStyles.code} />
                            }
                        }>


                            {optionsclasesdefault.Texto}


                        </ReactMarkdown>

                        /* seccion 5 temas puntuales */

                    )}
                </Box>
            </Grid>

            <Grid item align="center" elevation={3} mt={2}>
                <Box style={{
                    width : '100%',
                }}>
                    {(optionsclasesdefault) && (

                       /*  <iframe class="discord"  sandbox="allow-scripts allow-forms" width="100%" height="500" src="https://discord.com/channels/1101581994355347526/1104192484852121640" /> */
                        <div>
                            <BasicTabs></BasicTabs>
                        </div>

                    )}
                </Box>
            </Grid>

        </div>

    );

}
