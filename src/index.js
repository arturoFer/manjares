const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use(require('./routes/index'));
app.use('/receta', require('./routes/receta'));
app.use(require('./routes/favoritos'));
app.use(require('./routes/sobre'));
app.use(require('./routes/cookies'));
app.use(require('./routes/titles'));

// Public
app.use(favicon(path.join(__dirname,'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server is in port ', app.get('port'));
})