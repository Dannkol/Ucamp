import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink)

const deletAny = async (pathdelet) => {
    for (const filePath of pathdelet) {
        try {
            await unlinkAsync(filePath)
            console.log('Archivo eliminado:', filePath);
        } catch (err) {
            console.log(err);
            if (err.code === 'ENOENT') {
                console.warn('El archivo no existe en la ubicación especificada:', filePath);
            } else {
                console.error('Error al eliminar el archivo:', err);
            }
        }
    }
}

export { deletAny }
