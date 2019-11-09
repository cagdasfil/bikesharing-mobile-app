const express = require('express');

const app = express();

//ROUTES
app.get('/', (req,res)=> {
    res.send('Welcome To BikeSharing');
})

app.get('/posts', (req,res)=> {
    res.send('Welcome To Posts');
})


//listen
app.listen(3000);