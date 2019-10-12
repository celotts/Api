const request = require('request');
const redis = require('async-redis');
const Ciudad = require('../model/ciudad')
const axios = require('axios');
const API_KEY = '39860039f1eeda6dd272f43d61ae467d';// 'a5e036bc49458c5f7bb593e87668f9a8';

let redisCiudades = redis.createClient(6379);

const checkIfRequestFailed = () => {
    if (Math.random() < 0.1) {
        throw new Error('How unfortunate! The API Request Failed')
    }
}

dataCiudad = async (req, res, next) => {
    pushCiudades();
    let ciudadesRes = await Ciudades();
    let ciudadesClima = await ciudadClima(JSON.parse(ciudadesRes))
    return res.json(ciudadesClima);
}

let pushCiudades = async () => {
    let ciudad = []
    ciudad.push(new Ciudad('CL', 'Santiago', -70.6482700, -33.4569400));
    ciudad.push(new Ciudad('CH', 'Zurich', 8.5500000, 47.3666700));
    /*ciudad.push(new Ciudad('NZ', 'Auckland', 174.7833300, -36.8500000));
    ciudad.push(new Ciudad('AU', 'Sydney', 141.7022200, -13.4183300));
    ciudad.push(new Ciudad('UK', 'Londres', -0.118092, 51.509865));
    ciudad.push(new Ciudad('USA', 'Georgia', -83.5001800, 32.7504200)); */
    let ciudadesJSON = await redisCiudades.set('keyCiudades', JSON.stringify(ciudad));
    return ciudadesJSON;
}

let Ciudades = async (req, res) => {
    let ciudadesRedis = await redisCiudades.get("keyCiudades");
    return ciudadesRedis;
}

let ciudadClima = async (ciudades) => {
    let dataClima = [];
    for (let i = 0; i < ciudades.length; i++) {
        dataClima.push(await seachTemperatura(ciudades[i]));
    }
    return dataClima
}

let seachTemperatura = async (objetoCiudad) => {
    let dataClima = await axios.get(`https://api.darksky.net/forecast/${API_KEY}/${objetoCiudad.latitud},${objetoCiudad.longitud}`)
    return {
        ciudad: `(${objetoCiudad.codigoCiudad}) - ${objetoCiudad.nombreCiudad} `,
        latitud: objetoCiudad.latitud,
        longitud: objetoCiudad.longitud,
        hora: await converTime(dataClima.data.currently.time),
        temperatura: dataClima.data.currently.temperature
    }

}

let converTime = (horaOriginal) => {
    let hora = new Date(horaOriginal).getHours();
    let minutos = new Date(horaOriginal).getMinutes();
    hora = (hora < 10) ? '0' + hora : hora;
    minutos = (minutos < 10) ? '0' + minutos : minutos;

    let horaFormateada = (hora + ':' + minutos);
    return horaFormateada;
}

module.exports = {
    dataCiudad
}
