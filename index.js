const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const funcs = require('./indexfuncs');

//Constants
const app = express();
const passHash = bcrypt.hashSync(fs.readFileSync('./logs/passphrase.txt').toString());//Hashed version of password
let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));


//View Engine
app.set('view engine','ejs');
app.set('views','views');

//Middleware
app.use(express.urlencoded({extended:true}));

app.listen(3000);




app.get('/retry',(req,res)=>{
    res.render('retry');
});

app.get('/',(req,res)=>{
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    res.render('index', {bots});
});

app.get('/success',(req,res)=>{
    res.render('success');
});

app.post('/',(req,res)=>{
    let formData = req.body;
    console.log(formData);
    if(bcrypt.compareSync(formData.pwd,passHash)){
        delete formData.pwd;
        switch(formData.action){
            case 'run':
                //When there's an error in the functions, it redirects the user to retry
                if(funcs.runBot(formData)){res.redirect('/retry');}
                break;
            case 'update':
                if(funcs.updateBot(formData)){res.redirect('/retry');}
                res.redirect('/success');
                break;
            case 'add':
                if(funcs.addBot(formData)){res.redirect('/retry');}
                res.redirect('/success');
                break;
            case 'delete':
                if(funcs.delBot(formData)){res.redirect('/retry');}
                res.redirect('/success');
                break;
            default:
                break;
                

        }
    }
    else{
        res.redirect('/retry');
    }
    
});


app.use((req,res)=>{
    res.status(404).render('404');
});