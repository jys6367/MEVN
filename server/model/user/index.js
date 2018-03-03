import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'

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

let User = mongoose.model("User", UserSchema);
// export default User;

export default {
    User
}