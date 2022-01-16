exec = require('child_process').exec;
fs = require('fs');

function runBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    if(bots.find(bot=>{bot.name===formData.botChoice;})){return {isError:true,msg:'Bot not found in bot list'};}
    exec(`cd discord_bots\\${formData.botChoice}; node index.js`,(err,stdout,stderr)=>{
        if(err){
            return {isError:true,msg:'Error with running bot'};
        }
    });
    return {isError:false,msg:`Successfully ran ${formData.botChoice}`};
}


function updateBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    let theBotChoice;
    bots.forEach(bot => {
        if (bot.name===formData.botChoice) {
            theBotChoice=bot;
        }
    });    if(theBotChoice===undefined){return {isError:true,msg:'Bot not found in bot list'};}
    exec(`cd discord_bots\\${formData.botChoice}; git pull ${theBotChoice.link}`,
    (err,stdout,stderr)=>{
        if(err){
            return {isError:true,msg:'Error with pulling bot link'};
        }
    }); 
    return {isError:false,msg:`Successfully updated ${formData.botChoice}`};

}

function addBot(formData){
    exec(`cd discord_bots; mkdir ${formData.addOptions[0]}; cd ${formData.addOptions[0]}; git init; git pull ${formData.addOptions[1]}`,
    (err,stdout,stderr)=>{
        if(err){

            return {isError:true,msg:'Problem with pulling bot or initiating git repository'};
        }
        let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
        bots.push({name:formData.addOptions[0],link:formData.addOptions[1]});
        fs.writeFile('./logs/bots.json',JSON.stringify(bots),(err)=>{
            if(err){return {isError:true,msg:'Problem with adding new bot to existing bots'};}
        });
    });
    return {isError:false,msg:`Successfully added ${formData.addOptions[0]}`}; 
}

function delBot(formData){
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));
    let theBotChoice;
    bots.forEach(bot => {
        if (bot.name===formData.botChoice) {
            theBotChoice=bot;
        }
    });
    if(theBotChoice===undefined){return {isError:true,msg:'Bot not found in bot list'};}
    fs.rmdir(`./discord_bots/${theBotChoice.name}`,{recursive:true} ,(err)=>{
        if(err){
            return {isError:true, msg:'Problem with removing bot'};
        }
        //Take out the bot whose index is where the bot name is equal to the form data bot choice
        bots.splice(bots.findIndex(bot=>{bot.name===formData.botChoice;}));
        fs.writeFile('./logs/bots.json',JSON.stringify(bots),(err)=>{
            if (err){
                //Make it add to logs
                return {isError:true,msg:'Problem with adding to logs'};
            }

        });
        
    }); 

    return {isError:false,msg:`Successfully deleted ${formData.botChoice}`};


}


module.exports = {runBot, updateBot, addBot, delBot};