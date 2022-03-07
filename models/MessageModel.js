import mongoose from 'mongoose';

const schema = mongoose.Schema({
    _id: {type: String},
    messageDetail: {type: Array}
});

const MessageModel = mongoose.model('MessageModel', schema);

export default MessageModel;