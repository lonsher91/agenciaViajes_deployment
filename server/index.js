//importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');


/*db.authenticate()
    .then(()=> console.log('DB connected!'))
    .catch(error=>console.log(error));
*/

//configurar express
const app = express();

//Habilitar pug
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//Cargar carpeta estática llamada 'public'
app.use(express.static('public'));

//Validar si nos encontramos en produccion o desarrollo
const config = configs[app.get('env')];

//Crear variable para el sitio web
app.locals.titulo = config.nombreSitio;

//Mostrar año actual
app.use((req, res, next)=> {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path; //Esto retorna la ruta donde nos encontramos 
    return next();
});

//lanzamos bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//Cargar las rutas
app.use('/', routes());

/** Puerto y host para la APP */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '3000';
app.listen(port ,host, ()=>{
    console.log('Servidor funcionando');
});