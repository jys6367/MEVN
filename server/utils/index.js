
module.exports ={
    getFiles(path){
        return require("fs").readdirSync(path);
    }
}