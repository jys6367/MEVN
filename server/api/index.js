import express from 'express'

import user from './user';
import board from './board';

const app = express();

// Add USERS Routes
app.use('/user', user);
app.use('/board', board);

app.use("/", function(req, res){
    res.json("fail")
})

export default app
