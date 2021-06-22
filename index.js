const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');

//Constants
const app = express();
const passHash = bcrypt.hashSync(fs.readFileSync('./logs/passphrase.txt').toString());



//View Engine
app.set('view engine','ejs');
app.set('views','views');

//Middleware
app.use(express.urlencoded({extended:true}));

app.listen(3000);



app.get('/',(req,res)=>{
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    res.render('index', {bots});
});

app.post('/',(req,res)=>{
    let formData = req.body;
    console.log(formData);
    if(bcrypt.compareSync(formData.pwd,passHash)){
        
    }
    else{

    }

    res.redirect('/');
});


app.use((req,res)=>{
    res.status(404).render('404');
});