const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const funcs = require('./indexfuncs');

//Constants
const app = express();
const passHash = bcrypt.hashSync(fs.readFileSync('./logs/passphrase.txt').toString());//Hashed version of password
const PORT = 3000;
const HOST = '0.0.0.0';

//Global variables
var clientmessage;
let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));

//View Engine
app.set('view engine','ejs');
app.set('views','views');

//Middleware
app.use(express.urlencoded({extended:true}));

app.listen(PORT,HOST);


// fs.writeFileSync('./logs/server-uptime.txt','')//Wipe server logs for dev purposes
// fs.writeFileSync('./logs/bots.json','[]')//Wipe bots.json for dev purposes

//TODO
//addBot is not adding the bot to bots.json

app.get('/retry',(req,res)=>{
    serverLog(clientmessage);
    res.render('retry');
});

app.get('/',(req,res)=>{
    res.render('index', {bots});
});

app.get('/success',(req,res)=>{
    serverLog(clientmessage);
    res.render('success');
});

app.post('/',(req,res)=>{
    let formData = req.body;
    if(bcrypt.compareSync(formData.pwd,passHash)){
        delete formData.pwd;
        switch(formData.action){


            case 'run': // Run
                cmd_response = funcs.runBot(formData);
                clientmessage = cmd_response.msg;
                if(cmd_response.isError){
                    res.redirect('/retry');
                }
                else{
                    res.redirect('/success');
                }
                break;



            case 'update': //Update
                cmd_response = funcs.updateBot(formData);
                clientmessage = cmd_response.msg;
                if(cmd_response.isError){
                    res.redirect('/retry');
            }
                else{
                    res.redirect('/success');
                }
                break;



            case 'add': //Add 
                cmd_response = funcs.addBot(formData);
                clientmessage = cmd_response.msg;
                if(cmd_response.isError){
                    res.redirect('/retry');
                }
                else{
                    res.redirect('/success');
                }
                break;




            case 'delete': //Delete
                cmd_response = funcs.delBot(formData);
                clientmessage = cmd_response.msg;
                if(cmd_response.isError){
                    res.redirect('/retry');
                }
                else{
                    res.redirect('/success');
                }
                break;


            default:
                clientmessage = 'Not a valid command'
                res.redirect('/retry');
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

function serverLog(line){
    line = '\nOperation Message:'+line+` at ${new Date()}`;
    fs.appendFile('logs/server-uptime.txt',line,(err)=>{
        if(err){console.log(`Logging failed at ${new Date()}`);}
    });
}