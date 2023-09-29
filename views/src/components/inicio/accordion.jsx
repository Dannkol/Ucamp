import React, { useEffect, useState } from "react";

import { TextField, ThemeProvider, Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Container, Typography, Avatar, Paper, Grid, Button, createTheme } from '@mui/material';
import { DateRange, Edit as EditIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const truncateStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};


const defaultTheme = createTheme()

const Accordeon = (props) => {

    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = props.data.map(item => ({
        ...item,
        cards: item.cards.filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase())),
    })).filter(item => item.cards.length > 0);

    return (
        <ThemeProvider theme={defaultTheme}>

            <Grid container component="main" style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '18px'
            }}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
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
                                }}>
                                    {console.log(item)}
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
                                                            <Typography style={truncateStyles} variant="body2">Contenido de la tarjeta {card.summary} </Typography>
                                                        </CardContent>
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