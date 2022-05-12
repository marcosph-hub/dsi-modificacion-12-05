import express from 'express';
import {join} from 'path';
const {spawn} = require('child_process');

/**
 * Se crea el servidor con express
 */
const app = express();

/**
 * Se establece la ruta en public
 */
app.use(express.static(join(__dirname, '../public')));

/**
 * Se accede al punto de acceso en execmd
 */
app.get('/execmd/:cmd/:args/:file', (req, res) => {
  const cat = spawn(req.params.cmd, [req.params.args, req.params.file]);

  // if (!req.params.cmd) {
  //   return res.send({
  //     error: 'No se ha proporcionado un comando',
  //   });
  // }

  // if (!req.params.args) {
  //   return res.send({
  //     error: 'No se ha proporcionado un argumento',
  //   });
  // }

  // if (!req.params.args) {
  //   return res.send({
  //     error: 'No se ha proporcionado un fichero',
  //   });
  // }

  let resultado = '';
  cat.stdout.on('data', (data: any) => {
    resultado += data;
    return res.send({
      resultado,
    });
  });

  let error = '';
  cat.stderr.on('data', (data: any) => {
    error += data;
    return res.send({
      error,
    });
  });

  // cat.on('close', (err) => {
  //   if(err) {
  //     return res.send({
  //       error,
  //     });
  //   }
  // })
});

/**
 * Ruta por defecto
 */
app.get('*', (_, res) => {
  res.send('<h1>Error 404</h1>');
});

/**
 * Puerto de escucha del servidor
 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
