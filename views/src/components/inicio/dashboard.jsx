import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(false);

    const serverBackend = JSON.parse(import.meta.env.VITE_SERVERBACKEND)

    useEffect(() => {
        // Realizamos la solicitud Axios dentro de useEffect
        axios.get(`http://${serverBackend.HOSTNAME}:${serverBackend.PORT}/dashboard`, { withCredentials: true })
            .then(response => {
                // Cuando la solicitud es exitosa, actualizamos el estado con los datos recibidos
                setUser(response.data.message);
            })
            .catch(error => {
                navigate('/login')
                // Manejar errores aquí si es necesario
                console.error(error);
            });
    }, []);

    return (
        <div>
            {user ? ( // Verificamos si user tiene datos antes de mostrarlos
                <div>
                    <h1>Bienvenido, {user}</h1>
                    {/* Puedes mostrar más información relacionada con el usuario aquí */}
                </div>
            ) : (
                <div>
                    <h1>Cargando</h1>

                </div>
            )}
        </div>
    );
}
