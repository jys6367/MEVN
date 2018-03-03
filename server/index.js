

let config = require('./config');
let db =  require('./model')();
let app = require('./init')();

app.listen(config.port, config.host, function(){
    console.log("SERVER INIT")
})
console.log('Server listening on ' + config.host + ':' + config.port);