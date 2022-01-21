const fs = require('fs');



/*
Commands
    Redirect into bot folder
    Run with node

Changed Data
    None
*/
function runBot(formData) {

}



/*
Commands
    Redirect into bot folder
    Git pull in bot folder
    npm install in order to upgrade what's with package.json

Changed Data
    None
*/
function updateBot(formData) {
    
}


/*
Commands
    Redirect into discord bots
    mkdir with bot name
    Redirect into bot folder
    git pull
    npm install to upgrade from package.json

Changed Data
    Add given bots to bots.json
*/
function addBot(formData) {
    
    fs.mkdir(`./discord_bots/${formData.addOptions[0]}`,(err)=>{
        if (err) {
            return {isError:true,msg:'Problem making directory'};
        }
    });

}








/*
Commands
    rmdir the bot folder, recursively

Changed Data
    Remove given bot from bots.json

*/
function delBot(formData) {
    
}



//Cleans string from weird characters and 
function cleanString(given_string) {
    
}









// module.exports = {runBot, updateBot, addBot, delBot};