const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const errorMiddleware = require('./middleware/errors')
const { ConexionRedis } = require('./database');

//Setting
app.set('port', process.env.PORT || 3000);

const hostname = 'localhost';
const porDb = '4200';

//Middlewares
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: `http://${hostname}:${porDb}` }));

// Routers
app.use(require('./routes/ciudad.router'));
app.get('*', (req, res) => {
    res.status(404).end('404 No encontrado!');
});
app.use(errorMiddleware);

app.listen(app.get('port'), () => {
    console.log(`Server iniciado en el puerto ${app.get('port')}`);
});