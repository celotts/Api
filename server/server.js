const express = require('express');
const app = express();

app.get('/ciudad', function (req, res) {
    res.json('Hola clott')
})


/* const api = require('./routes/ciudad.router');
 */
const bodyParser = require('body-parser');
const cors = require('cors');
/* const errorMiddleware = require('./middleware/errors')
 */
const socketIo = require("socket.io");
const axios = require("axios");

const hostname = 'localhost';
const porDb = '4200';

const redis = require('redis');
const client = redis.createClient('redis://127.0.0.1:6379');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: `http://${hostname}:${porDb}`,
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200
    }
));

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
})