const express = require('express');
const port = 8000;

const app = express();

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log('Yup!!Server is running at the port :' + port);
})