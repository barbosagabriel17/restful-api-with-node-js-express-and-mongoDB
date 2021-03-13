const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


/*
//MiddLewares
app.use('/posts', () => {
    console.log('This is a middleware running')
})*/

//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
});

//COnnect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {   
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, 
    () => {
        console.log('Connected to DB')
    }
);

app.listen(3000);