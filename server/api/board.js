const router = require("express").Router()

const Board = require("../model/board");

router.get("/getList", function (req, res) {
    Board.find({}, res.return)
});

router.get("/:id", function (req, res) {
    Board.findOne({_id: req.params.id}, res.return)
});

router.delete("/:id", function (req, res, next) {
    Board.deleteOne({_id:req.params.id}, res.return)
});

router.put("/:id", function (req, res) {
    Board.update({_id:req.params.id}, req.body, res.return)
});

router.post("/insert", function (req, res) {
    let board = new Board({
        ...req.body,
        regDate : new Date()
    });

    board.save(res.return);
})


module.exports = router;