import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {type: String},
    _id: {type: String},
    password: {type: String},
    interests: {type: Array}
});

const UserModel = mongoose.model('UserModel', schema);

export default UserModel;