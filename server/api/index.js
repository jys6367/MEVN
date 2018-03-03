import express from 'express'

const app = express();

require("fs").readdirSync(__dirname).forEach(file=>{
    if(file == 'index.js') return;

    let route = require(`./${file}`)

    app.use(`/${file}`, route.default);
})


app.use("/", function(req, res){
    res.json("fail")
})

export default app
