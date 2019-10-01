
const ForecastIo = require('forecastio');
const clima = new ForecastIo('a5e036bc49458c5f7bb593e87668f9a8');

const redis = require('redis');
const client = redis.createClient('redis://127.0.0.1:6379');


const coordenadas = async (req,res) => {

    /* let ciudades = await client.get('ciudades');
    console.log("1212",ciudades) */
    client.get('ciudades',function (err,res) {
        const ciudades = JSON.parse(res);
        let latitud = 0;
        let longitud = 0;
        ciudades.forEach(function (element) {
            latitud = parseInt(element.latitud,10);
            longitud = parseInt(element.longitud,10);
            clima.forecast(latitud,longitud,(err,data) => {

                if (err) {
                    next();
                    return;
                }
                element.hora = data.timezone;
                element.temperatura = data.currently.temperature;
            });
            console.log("clima  ",clima);
            //return res.json(JSON.parse(ciudades));
        })
    })
    return res.json({ ok: true });
}

module.exports = {
    coordenadas
}