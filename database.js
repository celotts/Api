const redis = require('redis');
const port = "6379";
const host = "localhost";


let clientDb = redis.createClient({ host: host,port: port })
clientDb.on('connect',() => console.log(`Conectado Redis en el puerto ${port}`))
clientDb.on('error',function (err) {
    console.log(`Falló la conexión con la base de dato`);
    throw new Error(`Falló la conexión con la base de dato`);
})

module.exports = redis;