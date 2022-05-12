"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const { spawn } = require('child_process');
/**
 * Se crea el servidor con express
 */
const app = (0, express_1.default)();
/**
 * Se establece la ruta en public
 */
app.use(express_1.default.static((0, path_1.join)(__dirname, '../public')));
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
    cat.stdout.on('data', (data) => {
        resultado += data;
        return res.send({
            resultado,
        });
    });
    let error = '';
    cat.stderr.on('data', (data) => {
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
