const socketIo = require('socket.io');
const ciudades = require('./ciudad');
class IoChanel {

    constructor(server) {
        this.io = socketIo(server);
        this.iniciaComunicacion();
    }

    iniciaComunicacion() {
        console.log("aquiiiiiii");
        let interval = null;
        this.io.on("connection", socket => {
            console.log("Nueva conexion");
            if (interval) {
                clearInterval(interval);
            }
            interval = setInterval(
                async () => {
                    let data = await ciudades.dataCiudad();
                    socket.emit("update", data);
                }, 10000);

            socket.on("disconnect", () => {
                console.log("Servicio Desconectado");
            });
        });
    }

}

module.exports = IoChanel;