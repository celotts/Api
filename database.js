var redis = require('redis');
var port = "6379";
var host = "localhost";

var clientDb = redis.createClient({ host: host, port: port })
    .on('connect', () => console.log(`Conectado Redis en el puerto ${port}`))
    .on('error', function (err) {
        throw new Error(`Falló la conexión con la base de dato`);
    })

module.exports = redis;