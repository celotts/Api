
const ForecastIo = require('forecastio');
const clima = new ForecastIo('a5e036bc49458c5f7bb593e87668f9a8');

const redis = require('redis');
const client = redis.createClient('redis://127.0.0.1:6379');
const axios = require("axios");
let ciudadesClima = [];
const coordenadas = async (req,res) => {

    /* let ciudades = await client.get('ciudades');
    console.log("1212",ciudades) */
    client.get('ciudades',function (err,res) {
        ciudadesClima = JSON.parse(res);
        let latitud = 0;
        let longitud = 0;
    })
    ciudadesClima.forEach(function (element) {
            latitud = element.latitud;
            longitud = element.longitud;
            /* const res = await axios.get(
                "https://api.darksky.net/forecast/clima/latitud,longitud"
              ); */
        let res = temperatura({
            latitud: latitud,
            longitud:longitud 
            })
            console.log("clima  ",res);
            console.log("latitud",latitud);
            console.log("longitud",longitud);
           
        })
   
    return res.json({ ok: true });
}

const temperatura = async (req,res) => {
    try {
        console.log("Lotttt")
        const res = await axios.get(
            "https://api.darksky.net/forecast/clima/res.latitud,res.longitud"
        );
        return res;
      
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };
module.exports = {
    coordenadas
}