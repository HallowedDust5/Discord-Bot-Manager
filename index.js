const { query } = require('express');
const express = require('express');
const fs = require('fs');
const ifuncs = require("./indexfuncs");

//Initializes the server and the port
const app = express();
const port = 8080;
//Sends this folder to the client as their clientside application
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

 
//Starts the server and when it starts listening to the port, it writes when it started listening
app.listen(port, ()=>{
    // fs.appendFile("logs/server-uptime.txt", `Server started at ${Date.now()}\n`, (err) => {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("Time saved to server-uptime");
    // }); 
});

app.post('/', (req, res)=>{
     let query = req.body;

    



    res.end();
});
