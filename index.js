const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;

const app = express();
// layout
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-srategy');

const MongoStore = require('connect-mongo')(session);
const saasMiddleware = require('node-sass-middleware');

app.use(saasMiddleware({
    src : './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle : 'extended',
    prefix : '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

//extract style and script from sub pages into layouts
app.set(' layout extractStyles',true);
app.set(' layout extractScripts',true);

app.use(express.static('assets'));
// set view
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Email Authorization',
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
    {
        
            mongooseConnection : db,
            autoRemove : 'disabled'
        
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log('Yup!!Server is running at the port :' + port);
})