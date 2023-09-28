import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.rm);

const deletAny = async (pathdelet) => {
  let count = 0;

  for (const filePath of pathdelet) {
    if (fs.stat(filePath)) {
      // Aumenta el tiempo de espera del proceso de eliminación del video.
      // El video se eliminará después de 10 segundos.
      setTimeout( async () => {
        try {
          await unlinkAsync(filePath, { recursive: true });
          count++;
        } catch (err) {
          return
        }
      }, 10000);
    } else {
      count++;
    }
  }

  return count;
};

export { deletAny };