let redis = require('redis');
const ForecastIo = require('forecastio');
const clima = new ForecastIo('a5e036bc49458c5f7bb593e87668f9a8');

let redisCiudad = redis.createClient(6379);
const coordenadasController = {};
coordenadasController.temperatura = async (req, res, next) => {

    let ciudades = [];
    redisCiudad.get('ciudades', function (err, reply) {
        ciudades = res.json(JSON.parse(reply));

        let latitud = 0;
        let longitud = 0;
        res.forEach(function (element) {
            latitud = parseInt(element.latitud, 10);
            longitud = parseInt(element.longitud, 10);
            clima.forecast(latitud, longitud, (err, data) => {

                if (err) {
                    next();
                    return;
                }
                element.hora = data.timezone;
                element.temperatura = data.currently.temperature;
            });
            return res.json(JSON.parse(ciudades));
        })

    })

}

module.exports = coordenadasController;