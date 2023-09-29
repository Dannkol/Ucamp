import React, { useState, useEffect } from 'react';

import { TextField, ThemeProvider, Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Container, Typography, Avatar, Paper, Grid, Button, createTheme } from '@mui/material';
import Stack from '@mui/material/Stack';

const defaultTheme = createTheme();


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
    console.log('dsds', name);
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}


const UserProfile = (poprs) => {

    const username = poprs.user.username

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
                        </Grid>
                    </Grid>
                </Paper>

            </Grid>
        </ThemeProvider>
    );
};

export default UserProfile;
