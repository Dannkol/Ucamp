import React, { useEffect, useState } from "react";

import { TextField, ThemeProvider, Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Container, Typography, Avatar, Paper, Grid, Button, createTheme, CardActions } from '@mui/material';
import { DateRange, Edit as EditIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";
import axios from "axios";



const truncateStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};


const defaultTheme = createTheme()

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

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

const Accordeon = ({data, onChangeUpdate}) => {

    const navigate = useNavigate()

    const [showacordeon, setShowAcordeon] = useState('open')
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = data.map(item => ({
        ...item,
        cards: item.cards.filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase())),
    })).filter(item => item.cards.length > 0);


    return (
        <ThemeProvider theme={defaultTheme}>

            <Grid container component="main" style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '18px',
                width: '100%',
            }}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', width: '80%' }}>
                    <Grid item spacing={2} xs={12}>
                        <TextField
                            label="Buscar por título"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        {filteredData.length > 0 && (
                            filteredData.map((item, index) => (
                                <Accordion key={index} style={{
                                    maxWidth: '100%',
                                }}
                                expanded={showacordeon === item.title}
                                onClick={() => setShowAcordeon(item.title)}
                                >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{item.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container style={{
                                            overflowY: 'auto',
                                            maxHeight: '550px'
                                        }} spacing={2}>
                                            {item.cards.map((card, cardIndex) => (
                                                <Grid item xs={12} sm={4} key={cardIndex} style={
                                                    {
                                                        maxWidth: '90vw'
                                                    }
                                                }>
                                                    <Card style={{
                                                        overflowY: 'hidden',
                                                        maxHeight: '550px',
                                                        maxWidth: 'auto'
                                                    }}>
                                                        <CardContent>
                                                            <Typography style={truncateStyles} variant="h6">{card.title}</Typography>
                                                            <hr></hr>
                                                            <Typography style={truncateStyles} variant="body2">Contenido de la tarjeta <br />
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

                                                                    {card.summary.split(' ').slice(0, 4).join(' ')}

                                                                </ReactMarkdown>
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button onClick={() => navigate(`/preview/cursos?id=${card.id}&tipo=${item.title.split(' ')[1]}`)} size="small">Ver</Button>
                                                            {["Mi lista","Mis cursos"].includes(item.title) && (
                                                                <Button
                                                                    onClick={ async () => {
                                                                        await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard/mylist/delate/${card.id}`, { withCredentials: true })
                                                                        onChangeUpdate()
                                                                    }}
                                                                    color="tertiary"
                                                                    size="small"
                                                                    variant="filled" >Eliminar</Button>
                                                            )}
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            )
                            ))
                        }
                    </Grid>
                </Paper>
            </Grid>
        </ThemeProvider>
    )
}

export default Accordeon