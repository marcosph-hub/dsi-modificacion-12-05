"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { spawn } = require('child_process');
/**
 * Server created by express function
 */
const app = (0, express_1.default)();
/**
 * Authomatic Json parse object
 */
app.use(express_1.default.json);
app.get('*', (_, res) => {
    res.status(404).send();
});
app.get('/execmd', (req, res) => {
    const SERVER_PROMISE = new Promise((resolve, reject) => {
        const ls = spawn(req.query.cmd, [`${req.query.args}`]);
        let lsOutput = '';
        ls.stdout.on('data', (data) => {
            lsOutput += data;
        });
        let lsError = '';
        ls.stderr.on('data', (err) => {
            lsError += err;
            console.error(`COMMAND ERROR: ${lsError}`);
        });
        resolve(`${lsOutput}`);
        reject(`${lsError}`);
        ls.on('close', () => {
            SERVER_PROMISE.then((result) => {
                res.send(result);
            }).catch((error) => {
                res.send(error);
            });
        });
    });
});
;
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
