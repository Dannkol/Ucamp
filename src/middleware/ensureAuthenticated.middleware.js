import { deletAny } from "../models/DelateFiled.js";

const ensureAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // El usuario está autenticado, continuar con la solicitud
    } else if (req.files) {
        
        let linksToDelete = []

        for (let item in req.files) {
            req.files[item].forEach((value) => {
                linksToDelete.push(value.path);
            });
        }

        let filesDeleted = await deletAny(linksToDelete);
        req.files = [];
        linksToDelete = []
        if (filesDeleted < linksToDelete.length) {
            return res.status(500).json({
                message: 'No se pudieron eliminar todos los archivos',
            });
        }
    } else {
        res.status(401).json({
            message: false
        }); // El usuario no está autenticado, redirigirlo a la página de inicio de sesión
    }


}

export { ensureAuthenticated }