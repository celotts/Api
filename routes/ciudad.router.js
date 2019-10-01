const express = require('express');
const router = express.Router();
const ForecastIo = require('forecastio');
const clima = new ForecastIo('a5e036bc49458c5f7bb593e87668f9a8');
let redis = require('redis');

//creamos un cliente
let redisCiudad = redis.createClient(6379);

const ciudadController = require('../controllers/ciudad.controller');
const coordenadasController = require("../controllers/coordenadas.controller");

router.get('/ciudades', ciudadController.setCiudades);

router.get('/coordenadas', coordenadasController.temperatura);

module.exports = router;