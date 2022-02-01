const fs = require('fs');


const ssh_link_re = /(?<=\/).*(?=\.git)/;
const https_link_re = /(?<=\/\/github.com\/.*\/).*(?=\.git)/;
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
    Make sure it's a new bot
    Store list of all bots right now
    git clone into discord_bots
    Add repo as origin
    Figure out difference in what was added and add that folder name to bots.json
        This option is better because the other one runs something directly from the user


Changed Data
    Add given bots to bots.json
*/
function addBot(formData) {
    let repo_name = getRepoName(formData.addOptions[0]);

    if(!isNewBot(formData.addOptions[0])){
        return {isError:true,msg:`${repo_name} is already present`};
    }


}




//addBot helper functions
const getRepoName = (repo_link)=>{
    if(repo_link.contains('git@github.com')){
        return repo_link.match(ssh_link_re)[0];
    }
    else if(repo_link.contains(`https://github.com`)){
        return repo_link.match(https_link_re)[0];
    }
    return null;
};


const isNewBot = (repo_link) => {
    repo_name = getRepoName(repo_link);
    fs.readdir('./discord_bots',(err,files)=>{
        return files.includes(repo_name);
    });
};
//End of addBot helper functions






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

//Server log function
function serverLog(line){
    line = '\nOperation Message:'+line+` at ${new Date()}`;
    fs.appendFile('logs/server-uptime.txt',line,(err)=>{
        if(err){console.log(`Logging failed at ${new Date()}`);}
    });
}







// module.exports = {runBot, updateBot, addBot, delBot};