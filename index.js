const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;

const app = express();
// layout
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

//extract style and script from sub pages into layouts
app.set(' layout extractStyles',true);
app.set(' layout extractScripts',true);
// use express router
app.use('/',require('./routes'));
app.use(express.static('assets'));
// set view
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log('Yup!!Server is running at the port :' + port);
})