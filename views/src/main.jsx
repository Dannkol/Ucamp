import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInSide from './components/login/SignInSide'
import './index.css'
import Layout from './components/navbar/Layout';

import Dashboard from './components/inicio/dashboard';
import UploadCourses from './components/upload/classes/uploadCourses';
import { IndexPreview } from './components/preview';
import UserProfile from './components/about/aboutmi';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BrowserRouter> {/* CREAR RUTAS CON UN PATH DEFINCIDO EN ESTE CASO LO SACA DE UN ENV basename={import.meta.env.VITE_URL_PRIVATE} */}
      <Layout>
        <Routes>
          <Route index element={<Dashboard />} />

          <Route path="/login" element={<SignInSide />} /> {/* RUTA POR DEFAULT */}
          <Route path="/formulario/clases" element={<UploadCourses typeUpdload={false} />} /> {/* RUTA PARA LA CREACION DE CLASES */}
          <Route path="/formulario/cursos" element={<UploadCourses typeUpdload={true}/>} /> {/* RUTA PARA LA CREACION DE CURSOS */}
          <Route path="/preview/cursos" element={<IndexPreview />} /> {/* RUTA PARA LA PREVIEW DE CURSOS */}
          <Route path="*" element={<h1>404</h1>} /> {/* RUTA PARA ERRORES */}
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
)
