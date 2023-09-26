import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.rm);

const deletAny = async (pathdelet) => {
  let count = 0;

  for (const filePath of pathdelet) {
    console.log(pathdelet, filePath);
    if (fs.stat(filePath)) {
      // Aumenta el tiempo de espera del proceso de eliminación del video.
      // El video se eliminará después de 10 segundos.
      setTimeout( async () => {
        try {
          await unlinkAsync(filePath, { recursive: true });
          console.log('Archivo eliminado:', filePath);
          count++;
        } catch (err) {
          console.error('Error al eliminar el archivo:', err);
        }
      }, 10000);
    } else {
      count++;
    }
  }

  return count;
};

export { deletAny };