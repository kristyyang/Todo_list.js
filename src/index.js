const express = require('express');
const bodyParser = require('body-parser');

const api = express();

// Finding your project location and running the project
api.use(express.static(__dirname +'/public'));
api.use(bodyParser.json());

api.listen(3000,()=>{
console.log('API up and running!');
});

// First routes for API
// api.get('/',(req, res)=>{
//     // console.log(req); //console log the request
//     res.send('Hello world!');
// })

api.post('/add', (req,res)=>{
    console.log(req.body);
    res.send('It works!');
});
