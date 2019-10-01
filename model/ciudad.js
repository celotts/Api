class Ciudad {
    constructor(codigoCiudad, nombreCiudad, longitud, latitud) {
        this.codigoCiudad = codigoCiudad;
        this.nombreCiudad = nombreCiudad;
        this.latitud = latitud;
        this.longitud = longitud;
        this.hora = "";
        this.temperatura = "";
    }
}
module.exports = Ciudad;