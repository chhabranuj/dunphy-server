import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: {type: String},
    interestName: {type: String},
});

const InterestsModel = mongoose.model('InterestsModel', schema);

export default InterestsModel;