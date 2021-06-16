

//User Class
class User{
    
    constructor (userData){
        this.user = userData.user;
        this.pwd = userData.pwd;
        this.lvl = userData.lvl;
    }

    //Returns all user data
    get userData(){
        return {user:this.user, pwd:this.pwd, lvl: this.lvl};
    }

    //Checks to see if given user data is the same as its data
    isUser(userData){
        if(userData.user == this.user & userData.pwd == this.pwd ){
            return true;
        }
        return false;
    }
}

const users = [
    /* Cam */ new User({user:'',pwd:'', lvl:1}),
    /* Admin */new User({user:'',pwd:'', lvl:2})
];


    //exported functions

//Checks to see if the username is correct
//@params : userData = {username:'',pwd:''}
exports.UsernameAuthorization = (userData)=>{
    
    for(let user in users){
        try{
            if(user.isUser(userData)){
                return true;
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return false;
}






