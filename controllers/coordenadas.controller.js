
const claveClima = '39860039f1eeda6dd272f43d61ae467d';// 'a5e036bc49458c5f7bb593e87668f9a8';
const request = require('request');
const redis = require('redis');
const client = redis.createClient('redis://127.0.0.1:6379');
const axios = require("axios");

let ciudadesBase = require('./ciudad.controller');
let ciudadesClima = [];
const coordenadas = async (req, res) => {
    let resP = [];
    let resp2 = [];
    let ciudadesClima = ciudadesBase.setCiudades();
    client.get('ciudades', function (err, res) {
        ciudadesClima = JSON.parse(res)
            .forEach(async function (elementCiudad) {
                latitud = elementCiudad.latitud;
                longitud = elementCiudad.longitud;
                codigoCiudad = elementCiudad.codigoCiudad
                let apiUrl = `https://api.darksky.net/forecast/${claveClima}/${latitud},${longitud}`;
                resp2.push(fetRespuesta(apiUrl, elementCiudad));
                console.log('2222', resp2)
            })


    })
    return ({ a: res })
}



fetRespuesta = async (apiUrl, ciudades) => {
    let paramCiudad = ciudades;
    let resPX = []
    return climaRes = await request(apiUrl, (err, res, body) => {
        console.log(res.statusCode, apiUrl)
        if (!err && res.statusCode === 200) {
            const bodyParsed = JSON.parse(body);
            resPX.push({
                ciudad: `(${paramCiudad.codigoCiudad}) - ${paramCiudad.nombreCiudad} `,
                latitud: paramCiudad.latitud,
                longitud: paramCiudad.longitud,
                hora: bodyParsed.currently.time,
                temperatura: bodyParsed.currently.temperature
            });
            console.log(resPX)
        }

    })


}
module.exports = {
    coordenadas
}