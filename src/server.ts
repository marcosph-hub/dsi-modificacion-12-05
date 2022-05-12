import express from 'express';
import {join} from 'path';
const {spawn} = require('child_process');

/**
 * Server created by express function
 */
const app = express();

/**
 * Authomatic Json parse object
 */
app.use(express.json);

app.get('*', (_, res) => {
  res.status(404).send();
})

app.get('/execmd', (req,res) => {
  const SERVER_PROMISE = new Promise<string>((resolve, reject) => {
    
    const ls = spawn(req.query.cmd, [`${req.query.args}`]);

    let lsOutput = '';
    ls.stdout.on('data',(data) => {
      lsOutput += data;
    })
  
    let lsError = '';
    ls.stderr.on('data', (err) => {
      lsError += err;
      console.error(`COMMAND ERROR: ${lsError}`);
    });

    resolve(`${lsOutput}`)
    reject(`${lsError}`) 

    ls.on('close', () => {
      SERVER_PROMISE.then((result) => {
        res.send(result);
      }).catch((error) => {
        res.send(error)
      });
    });
  });
});

;

app.listen(3000,() => {
  console.log('Server is up on port 3000')
})