const Testimonial = require('../models/Testimoniales');

exports.infoTestimoniales = async (req, res) =>{
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
}

exports.insertaTestimonio = async (req, res) => {
    //Validar que los campos esten llenos
    let {nombre, correo, mensaje} = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'mensaje' : 'Debes añadir tu nombre'})
    }
    if(!correo){
        errores.push({'mensaje' : 'Debes añadir tu correo'})
    }
    if(!mensaje){
        errores.push({'mensaje' : 'Deja tu mensaje!'})
    }
    //Si hay errores se muestra en el DOM, sino se guarda en la base de datos el testimonio
    if(errores.length > 0){
        //Muestrae en DOM:
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales',{
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        });
    }else {
        //Almacena en la DB...
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
    }
}