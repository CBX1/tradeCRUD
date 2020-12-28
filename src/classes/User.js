export default class user{
    constructor(username, password,tid){
        this.username = username;
        this.password = password;
        this.tid = tid;
    }
    getUsername(){
        return this.username;
    }
    getPassword(){
        return this.password;
    }
    
    getTid(){
        return this.tid;
    }
    
}