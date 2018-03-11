module.exports = function BoardController() {

    this.get.getList = function ({Json}, {Board}) {
        Board.find({}, (err, data) => {
            return Json(data);
        })
    }


    this.get._id = function ({Json, params}, {Board}) {
        Board.findOne({_id: params.id}, (err, data) => {
            return Json(data)
        })
    }

    this.delete._id = function ({Json, Success}, {Board}) {
        Board.deleteOne({_id: this.params.id}, (err) => {
            if (err) return Error(err)

            return Success()
        })
    };

    this.put._id = function ({Error, Success, params, body}, {Board}) {
        Board.update({_id: params.id}, body, err => {
            if (err) return Error(err);

            Success()
        })
    };

    this.post.insert = function ({Success, Error, body}, {Board}) {
        let board = new Board({
            ...body,
            regDate: new Date()
        });

        board.save((err) => {
            if (err) return Error(err);

            Success();
        });
    }
}