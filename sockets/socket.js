const io = require('../server');
const ciudad = require('../controller/ciudad')
io.on('connection', (client) => {
    console.log("usuaio conectado");

    client.on('disconnect', () => {
        console.log("USuario Desconectado");
    })

    client.on('solicitarInformacion', () => {
        let dataCiudad = ciudad.dataCiudad();
        console.log("ddddddd", "dataCiudad");
    })

    client.emit('enviarData', (res) => {
        console.log("11111111111111111", "lottt");
    })
})
