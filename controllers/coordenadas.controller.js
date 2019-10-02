
const clima = 'a5e036bc49458c5f7bb593e87668f9a8';
const request = require('request');
const redis = require('redis');
const client = redis.createClient('redis://127.0.0.1:6379');
const axios = require("axios");
let ciudadesClima = [];
const coordenadas = async (req, res) => {

    let ciudadesClima = [];
    client.get('ciudades', function (err, res) {
        ciudadesClima = JSON.parse(res)
            .forEach(function (element) {
                latitud = element.latitud;
                longitud = element.longitud;
                let res = climaX({
                    latitud: latitud,
                    longitud: longitud
                })
            })
    })
    //    recorreCiudades()
    return res.json({ ok: true });
}


const climaX = async (ciudades) => {
    this.apiUrl = `https://api.darksky.net/forecast/${clima}/${ciudades.latitud},${ciudades.longitud}`;
    let resP = fetRespuesta(this);

    return resP;

}

fetRespuesta = async (consultaString) => {
    console.log(555, this.apiUrl)
    return new Promise((resolve, reject) => {
        const apiUrlConParams = this.apiUrl;
        request(apiUrlConParams, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            resolve(body);
            return JSON.parse(body);
        });
    })
}
module.exports = {
    coordenadas
}