import React , { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import DrawerComponent from "./DrawerNav";
import axios from 'axios';


export default function Layout({ children }) {


    const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)


    const navigate = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const location = useLocation();

    // Verificar si la ubicación actual es "/login"
    const isLoginPage = location.pathname === '/login';


    const handleFetch = async () => {
        try {
            await axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/logout`, { withCredentials: true })
        } catch (error) {
            console.log('error');
        } finally {
            navigate('/login')
        }
    }

    return (
        <>
            {!isLoginPage ? <Box sx={{ flexGrow: 1 }}>
                <AppBar position="relative" enableColorOnDark style={{ backgroundColor: '#0f7d7e' }} >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            
                        >
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {isMobile ? (

                                <DrawerComponent />

                            ) : (
                                <Box
                                    component="div"
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 2,
                                        justifyContent: 'start',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Link to="/" style={{ textDecoration: 'none' }} underline="none" >
                                        <Typography style={{ color: "white" }} component="h6" >Inicio</Typography>
                                    </Link>
                                    <Link to="/about" style={{ textDecoration: 'none' }} underline="none"  >
                                        <Typography style={{ color: "white" }} component="h6" >Perfil</Typography>
                                    </Link>
                                </Box>
                            )}
                        </Typography>
                        <Button onClick={handleFetch}>
                            <Typography style={{ color: "white" }} component="h6" >LogOut</Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box> : <Box />}

            <main>
                {children}
            </main>
        </>

    );
}