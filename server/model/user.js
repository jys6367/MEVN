const mongoose = require("mongoose")
const autoIncrement = require('mongoose-auto-increment');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    pwd: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        default: "REG"
    },
    name: {
        type: String,
        require: true
    },
    birthDay: {
        type: Date,
        require: true,
    },
    userType: {
        type: String,
        default: "NORMAL"
    },
    photo: {
        type: String,
    },
    regDt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(autoIncrement.plugin, {
    model: "User",
    startAt: 1,
    field: '_id'
});

// User.findById(_id, (err,result)=>{})
UserSchema.static("findById", function(_id, callback){
    return this.findOne({_id}, callback);
});

// result = new User().myMethod(arg1, arg2);
UserSchema.method("forClient", function(){
    return {
        _id : this._id,
        email : this.email,
        name: this.name,
        birthDay : this.birthDay,
        photo: this.photo,
        userType : this.userType,
        regDt : this.regDt,
    };
});

let User = mongoose.model("User", UserSchema);

module.exports = User;