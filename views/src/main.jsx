import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInSide from './components/login/SignInSide'
import './index.css'
import Layout from './components/navbar/Layout';

import Dashboard from './components/inicio/dashboard';
import UploadCourses from './components/upload/classes/uploadCourses';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_URL_PRIVATE}> {/* CREAR RUTAS CON UN PATH DEFINCIDO EN ESTE CASO LO SACA DE UN ENV */}
      <Layout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/login" element={<SignInSide />} /> {/* RUTA POR DEFAULT */}
          <Route path="/formulario" element={<UploadCourses />} /> {/* RUTA CON PARAMETROS */}
          <Route path="*" element={<h1>404</h1>} /> {/* RUTA PARA ERRORES */}
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
)
