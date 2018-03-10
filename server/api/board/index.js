const router = require("express").Router()


const Board = require("../../model/board");

router.get("/getList", function (req, res) {
    Board.find({}, function (err, data) {
        res.json(data);
    })
});

router.get("/:id", function (req, res) {
    Board.findOne({_id: req.params.id}, function (err, data) {
        res.json(data);
    })
});

router.delete("/:id", function (req, res) {
    Board.deleteOne({_id:req.params.id}, function(err){
        if(err){
            res.json(err);
        }
        else{
            res.json("Success");
        }
    })
});

router.put("/:id", function (req, res) {
    Board.update({_id:req.params.id}, req.body, function(err){
        if(err){
            res.json(err);
        }
        else{
            res.json(NoLogin)
            res.json("Success");
        }
    })
});

router.post("/insert", function (req, res) {
    console.log('board', req.body)
    let board = new Board({
        ...req.body,
        regDate : new Date()
    });
    board.save(function (err) {
        if (err) {
            console.log(err.message)
            res.json("error");
        }
        else {
            res.json("success");
        }
    });
})


module.exports = router;