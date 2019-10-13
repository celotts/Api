const express = require('express');
const router = express.Router();

const controllerCiudad = require('../controller/ciudad')

router.get('/ciudades', controllerCiudad.dataCiudad);

module.exports = router;