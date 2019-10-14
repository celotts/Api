const redis = require('async-redis');
const ServiceRedis = require('../ServiceRedis/serviceRedis')
const moment = require('moment');
const axios = require('axios');
const API_KEY = '2c89c8067a89d2af34962586aa4b44bf';/* '39860039f1eeda6dd272f43d61ae467d'; */ /* 'a5e036bc49458c5f7bb593e87668f9a8';*/

const API_REDIS = "keyCiydades";

let redisCiudades = redis.createClient();

let serviceRedis = new ServiceRedis(redisCiudades);

const chequeaRespuestaFallida = () => {

    if (Math.random() < 0.1) {
        throw new Error('Ha ocurrido una falla! El servidor no responde')
    }
}

dataCiudad = async (req, res, next) => {
    while (true) {
        try {
            //       chequeaRespuestaFallida();
            //serviceRedis.setRedisCiudades(API_REDIS);
            //let ciudadesRes = await serviceRedis.getRedisCiudades(API_REDIS);
            //let ciudadesClima = await ciudadClima(JSON.parse(ciudadesRes))
            let ciudadesClima = { a: '123' }
            return res.json(ciudadesClima);
        }
        catch (error) {
            console.log("object");
            let res = await serviceRedis.setRedisError('api.errors', moment().unix(), error.message);
        }
    }

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
        hora: await converTime(moment(dataClima.data.currently.time * 1000)),
        temperatura: ((dataClima.data.currently.temperature - 32) * 5 / 9)
    }
}

let converTime = (horaOriginal) => {
    let hora = new Date(horaOriginal).getHours();
    let minutos = new Date(horaOriginal).getMinutes();
    let segundos = new Date(horaOriginal).getSeconds();
    hora = (hora < 10) ? '0' + hora : hora;
    minutos = (minutos < 10) ? '0' + minutos : minutos;
    segundos = (segundos < 10) ? '0' + segundos : segundos;
    let horaFormateada = (hora + ':' + minutos + ':' + segundos);
    return horaFormateada;
}
module.exports = {
    dataCiudad
}
