import React, { useState, useEffect } from 'react';

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
    ThemeProvider,
    useTheme,
    useMediaQuery,
    createTheme,
    CssBaseline
} from '@mui/material';

import axios from 'axios';

const defaultTheme = createTheme();

import { PreviewCourse } from './previewCourse';
import { useNavigate } from 'react-router-dom';

const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

export function IndexPreview(props) {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    /* Props */

    const [fetchcourse, setFetchCourse] = useState([])
    const [fetchclase, setFetchClase] = useState([])

    const [clase, setClase] = useState([]);
    const [readme, setReadme] = useState(null);
    const [readmeclass, setReadmeClass] = useState(null);
    const [filevideo, setFileVideo] = useState(null);
    const [text, setText] = useState(null);
    const [title, setTitle] = useState(null);
    const [textclass, setTextClass] = useState(null);
    const [titleclass, setTitleClass] = useState(null);
    const [curso, setCurso] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [sheet, setSheet] = useState(null);

    const [optionsclases, setOptionsClases] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchDatacourse = async () => {
            try {
                const response = await fetch(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/infocourse/${id}`, { withCredentials: true });
                const data = await response.json();
                if (response.status !== 200) return navigate('/')
                setFetchCourse(data);
                console.log(data);
                setClase(data.courses?.[0]?.classes?.map(c => c._id) || [])
                setText(data.courses?.[0]?.summary || '')
                setTitle(data.courses?.[0]?.title || '')
                setQuiz(data.courses?.[0]?.quiz?.[0] || '')
                setSheet(data.courses?.[0]?.quiz?.[1] || '')
                setReadme(`http://localhost:5101/getReadme/${data.courses?.[0]?.content?.split('.')[0]}`)
                console.log(data.courses?.[0]?.classes?.map(c => c._id) || []);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchDatacourse();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (fetchcourse.courses.length > 0) {
                try {
                    setFetchClase(fetchcourse.courses[0].classes);
                    setTextClass(fetchcourse.courses[0].classes[optionsclases].summary);
                    setTitleClass(fetchcourse.courses[0].classes[optionsclases].title)
                    setFileVideo(`http://localhost:5101/getVideo/${fetchcourse.courses[0].classes[optionsclases].content[0].split('.')[0]}`)
                    setReadmeClass(`http://localhost:5101/getReadme/${fetchcourse.courses[0].classes[optionsclases].content[1].split('.')[0]}`)
                } catch (error) {
                    console.error(error);
                }
            }

        };

        fetchData();
    }, [fetchcourse, optionsclases])


    const tipo = true;

    const ChangeClass = (id) => {
        if (tipo) {
            setOptionsClases(id);
        }
    }

    const hooksPropsPreviewCourse = {
        clase,
        text,
        title,
        quiz,
        sheet,
        tipo,
        readme,
        ChangeClass
    };

    const hooksPropsPreviewClass = {
        textclass,
        titleclass,
        filevideo,
        readme: readmeclass,
        tipo,
        ChangeClass
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [openPreview, setOpenPreview] = useState(false);

    const handleOpenPrewieChange = (e) => {
        if (openPreview) {
            return setOpenPreview(false)
        }
        return setOpenPreview(true)
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" >
                <CssBaseline />
                {isMobile && (
                    <Grid position='fixed' style={{
                        margin: '10px',
                        bottom: 0
                    }}>
                        <Box>
                            <Button disabled={false}
                                size="small"
                                variant="large"
                                onClick={handleOpenPrewieChange}
                                style={{
                                    backgroundColor: 'rgb(4, 13, 18)',
                                    color: 'white',
                                    fontSize: '12px',
                                    width: '50px',
                                    height: '50px',
                                }}> {openPreview ? 'Cerrar' : 'Abrir'}</Button>
                        </Box>
                    </Grid>
                )}
                {!isMobile || openPreview ? (
                    <Grid item
                        xs={(openPreview ? 12 : false)}
                        md={(openPreview ? 12 : 8)}
                        sm={(openPreview ? 12 : 8)}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', // Alinea verticalmente al centro
                            height: '100%',
                            display: { xs: 'none', sm: 'block' }
                        }}
                        square
                    >
                        <Box
                            sx={{
                                height: '100vh',
                                width: '100%',

                                display: { xs: 'none', sm: 'block' },

                                overflow: 'auto',
                                display: 'flex', // Usar Flexbox
                                flexDirection: 'column', // Columnas para alinear verticalmente
                            }}

                        >

                            {<PreviewCourse {...hooksPropsPreviewClass} style={{ height: '100%', width: '100%', display: { xs: 'none', sm: 'block' } }} />}
                        </Box>
                    </Grid>
                ) : (
                    <Grid />
                )}
                {(openPreview && isMobile) ?
                    <Grid />

                    : <Grid item xs={isMobile ? 12 : false} sm={12} md={isMobile ? 0 : 4} component={Paper}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', // Alinea verticalmente al centro
                            height: '100%',
                            display: { xs: 'none', sm: 'block' }
                        }}
                        square
                    >
                        <Box
                            sx={{
                                height: '100vh',
                                width: '100%',

                                display: { xs: 'none', sm: 'block' },

                                overflow: 'auto',
                                display: 'flex', // Usar Flexbox
                                flexDirection: 'column', // Columnas para alinear verticalmente
                            }}

                        >
                            {<PreviewCourse {...hooksPropsPreviewCourse} style={{ height: '100%', width: '100%', display: { xs: 'none', sm: 'block' } }} />}
                        </Box>
                    </Grid>}
            </Grid>
        </ThemeProvider>
    )

}