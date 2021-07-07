fs = require('fs');

function runBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    if(bots.find(bot=>{bot.name===formData.botChoice;})){return 404;}
    exec(`cd discord_bots\\${formData.botChoice} & node index.js`,(err,stdout,stderr)=>{
        if(err){
            //add to logs and return a retry
            console.log(err);
            return 404;
        }
        console.log(stdout);
    }); 
}


function updateBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    let theBotChoice = bots.find(bot=>{bot.name===formData.botChoice;});
    if(theBotChoice===undefined){return 404;}
    exec(`cd discord_bots\\${formData.botChoice} & git pull ${theBotChoice.link}`,
    (err,stdout,stderr)=>{
        if(err){
            //add to logs and return a retry
            console.log(err);
            return 404;
        }
        console.log(stdout);
    }); 
}

function addBot(formData){
    exec(`cd discord_bots & mkdir ${formData.addOptions[0]} & cd ${formData.addOptions[0]} & git init & git pull ${formData.addOptions[1]}`,
    (err,stdout,stderr)=>{
        if(err){
            //add to logs and return a retry
            console.log(err);
            return 404;
        }
        console.log(stdout);
    }); 
}

function delBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    let theBotChoice = bots.find(bot=>{bot.name===formData.botChoice;});
    if(theBotChoice===undefined){return 404;}
    console.log(theBotChoice);
    fs.rmdir(`discord_bots/${theBotChoice}`,{recursive:true} ,(err)=>{
        if(err){
            //add to logs and return a retry
            console.log(err);
            return 404;
        }
        //Take out the bot whose index is where the bot name is equal to the form data bot choice
        bots.splice(bots.indexOf(bots.find(bot => {bot.name===theBotChoice;})));
        console.log(bots);
        fs.writeFile('./logs/bots.json',JSON.stringify(bots),(err)=>{
            if (err){
                //Make it add to logs
                return 404;
            }
            console.log('spliced');

        });
        
    }); 

}


module.exports = {runBot, updateBot, addBot, delBot};