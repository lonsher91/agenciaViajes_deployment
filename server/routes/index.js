const express = require('express');
const router = express.Router();

/**Models */
const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

/**Controllers */
const nosotrosController = require('../controller/nosotrosController');
const homeController = require('../controller/homeController');
const viajesController = require('../controller/viajesController');
const testimonialesController = require('../controller/testimonialesController');

module.exports = function () {
    router.get('/', homeController.consultasHomepage);
    
    router.get('/nosotros', nosotrosController.infoNosotros);

    router.get('/viajes', viajesController.infoViajes);

    router.get('/viajes/:id', viajesController.infoViajeSeleccionado);

    router.get('/testimoniales', testimonialesController.infoTestimoniales);

    //envío del formulario
    router.post('/testimoniales', testimonialesController.insertaTestimonio);

  
    return router;
}