const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const funcs = require('./indexfuncs')

//Constants
const app = express();
const passHash = bcrypt.hashSync(fs.readFileSync('./logs/passphrase.txt').toString());//Hashed version of password
let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));


//View Engine
app.set('view engine','ejs');
app.set('views','views');

//Middleware
app.use(express.urlencoded({extended:true}));
//app.use(()=>{bots = JSON.parse(fs.readFileSync('./logs/bots.json'));});

app.listen(3000);



app.get('/',(req,res)=>{
    res.render('index', {bots});
});

app.post('/',(req,res)=>{
    let formData = req.body;
    console.log(formData);
    if(bcrypt.compareSync(formData.pwd,passHash)){
        switch(formData.action){
            case 'run':
                funcs.runBot();
                break;
            case 'update':
                funcs.updateBot();
                break;
            case 'add':
                funcs.addBot();
                break;
            default:
                

        }
    }
    else{

    }
    res.render('retry');
    res.redirect('/');
});


app.use((req,res)=>{
    res.status(404).render('404');
});