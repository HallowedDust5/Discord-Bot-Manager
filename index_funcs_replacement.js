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
    let repo_link = formData.addOptions[0];
    let bots = JSON.parse(fs.readFileSync('./logs/bots.json'));

    //isAlreadyAdded is not returning true if a bot is in there
    if(isAlreadyAdded(repo_link)){
        return {isError:true,msg:`${repo_name} is already present`};
    }

    let local_git = simplegit('./discord_bots');

    local_git
        .clone(repo_link)
        .addRemote('origin',repo_link,(npmInstallPackages(`./discord_bots/${repo_name}`)));





    bots.push({name:repo_name,link:repo_link});
    return {isError:false,msg:`${repo_name} was successfully added`};
}




//addBot helper functions

const npmInstallPackages = (dir) =>{
    exec(`cd ${dir}; npm i;`,(err)=>{
        if(err){
            return err;
        }
    });
};

const getRepoName = (repo_link)=>{
    if(repo_link.includes('git@github.com')){
        return repo_link.match(ssh_link_re)[0];
    }
    else if(repo_link.includes(`https://github.com`)){
        return repo_link.match(https_link_re)[0];
    }
    return null;
};



const isAlreadyAdded = (repo_link) => {
    repo_name = getRepoName(repo_link);
    fs.readdir('./discord_bots',(err,files)=>{
        return files.includes(repo_name); 
    });
};






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