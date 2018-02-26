import {Router} from "express";

const router = Router();


router.get("/getList", function (req, res) {
    let database = req.app.get("database");
    database.Board.find({}, function (err, data) {
        res.json(data);
    })
});

router.get("/:id", function (req, res) {
    let database = req.app.get("database");
    database.Board.findOne({id: req.params.id}, function (err, data) {
        res.json(data);
    })
});

router.delete("/:id", function (req, res) {
    let {Board} = req.app.get("database");

    Board.deleteOne({id:req.params.id}, function(err){
        if(err){
            res.json(err);
        }
        else{
            res.json("Success");
        }
    })
});

router.put("/:id", function (req, res) {
    let {Board} = req.app.get("database");
    Board.update({id:req.params.id}, req.body, function(err){
        if(err){
            res.json(err);
        }
        else{
            res.json("Success");
        }
    })
});

router.post("/insert", function (req, res) {
    let body = req.body;
    let {Board} = req.app.get("database");
    let board = new Board();
    board.id = +new Date();
    board.title = body.title;
    board.content = body.content;
    board.save(function (err) {
        if (err) {
            res.json("error");
        }
        else {
            res.json("success");
        }
    });
})


export default router;