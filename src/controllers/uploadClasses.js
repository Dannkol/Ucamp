

// Ruta para manejar la carga de archivos

const uploadclass = (req, res) => {
    console.log(req.file);
    console.log(req.body.text);
  if (!req.file) {
    return res.status(400).send('No se ha seleccionado un archivo.');
  }
  res.status(200).send('Archivo subido correctamente.');
}


export { uploadclass }