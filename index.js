const express = require('express');
const fs = require('fs');

const app = express();
var bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
app.set('view engine','ejs');
app.set('views','views');


app.listen(3000);



app.get('/',(req,res)=>{
    res.render('index', {bots:bots});
});