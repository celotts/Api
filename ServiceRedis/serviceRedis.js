const redis = require('async-redis');
const Ciudad = require('../model/ciudad')


class ServiceRedis {
    constructor(redisCiudades) {
        this.redisCiudades = redisCiudades;
    }

    async setRedisCiudades(keyValue) {
        let ciudad = []
        ciudad.push(new Ciudad('CL', 'Santiago', -70.6482700, -33.4569400));
        /* ciudad.push(new Ciudad('CH', 'Zurich', 8.5500000, 47.3666700));
        ciudad.push(new Ciudad('NZ', 'Auckland', 174.7833300, -36.8500000));
        ciudad.push(new Ciudad('AU', 'Sydney', 141.7022200, -13.4183300));
        ciudad.push(new Ciudad('UK', 'Londres', -0.118092, 51.509865));
        ciudad.push(new Ciudad('USA', 'Georgia', -83.5001800, 32.7504200)); */
        await this.redisCiudades.set(keyValue, JSON.stringify(ciudad));
    }

    async getRedisCiudades(keyValue) {
        let ciudadesRedis = await this.redisCiudades.get(keyValue);
        return ciudadesRedis
    }

    async setRedisError(keyValue, hora, mensaje) {
        await this.redisCiudades.get(keyValue, [hora, mensaje])
    }
}

module.exports = ServiceRedis;