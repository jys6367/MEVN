const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const BoardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    regDate :{
        type: Date,
        default : Date.now
    }
});

BoardSchema.plugin(autoIncrement.plugin, {
    model: "Board",
    startAt: 1,
    field: '_id'
});

let Board = mongoose.model("Board", BoardSchema);

// export default {
//     Board
// }
module.exports = Board;
