const io = require('../server');

io.on('connection', (client) => {
    console.log("usuaio conectado");

    client.on('disconnect', () => {
        console.log("USuario Desconectado");
    })

    client.on('solicitarInformacion', () => {

    })

    client.emit('enviarData', { data: 'hola' })
})
