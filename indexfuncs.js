exec = require('child_process').exec;
fs = require('fs');

function runBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    if(bots.find(bot=>{bot.name===formData.botChoice;})){return 404;}//Think about this
    exec(`cd discord_bots\\${formData.botChoice} & node index.js`,(err,stdout,stderr)=>{
        if(err){
            //add to logs and return a retry
            console.log(err);
            return 'error with running bot';
        }
        console.log(stdout);
    }); 
}


function updateBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    let theBotChoice;
    bots.forEach(bot => {
        if (bot.name===formData.botChoice) {
            theBotChoice=bot;
        }
    });    if(theBotChoice===undefined){return 'Bot not found in bot list';}
    exec(`cd discord_bots\\${formData.botChoice} & git pull ${theBotChoice.link}`,
    (err,stdout,stderr)=>{
        if(err){
            //add to logs and return a retry
            console.log(err);
            return 'Error with pulling bot link';
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
            return 'Problem with pulling bot or initiating git repository';
        }
        let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
        bots.push({name:formData.addOptions[0],link:formData.addOptions[1]});
        fs.writeFile('./logs/bots.json',JSON.stringify(bots),(err)=>{
            if(err){return 'Problem with adding new bot to existing bots';}
        });
    }); 
}

function delBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    let theBotChoice;
    bots.forEach(bot => {
        if (bot.name===formData.botChoice) {
            theBotChoice=bot;
        }
    });
    if(theBotChoice===undefined){return 404;}
    fs.rmdir(`./discord_bots/${theBotChoice.name}`,{recursive:true} ,(err)=>{
        console.log('error');
        if(err){
            //add to logs and return a retry
            return 'Problem with removing bot';
        }
        //Take out the bot whose index is where the bot name is equal to the form data bot choice
        bots.splice(bots.findIndex(bot=>{bot.name===formData.botChoice;}));
        fs.writeFile('./logs/bots.json',JSON.stringify(bots),(err)=>{
            if (err){
                //Make it add to logs
                return 'Problem with adding to logs';
            }

        });
        
    }); 

}


module.exports = {runBot, updateBot, addBot, delBot};