import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import MessageModel from '../models/MessageModel.js';

const jsonParser = bodyParser.json();
const messageRouter = express.Router();

const mongoUri = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongoUri);
let database;
let messageCollection;

messageRouter.get('/getMessages', jsonParser, async (request, response) => {
    try {
        await mongoClient.connect();
        database = mongoClient.db('dunphyDatabase');
        messageCollection = database.collection('messageCollection');
        const query = {_id: request.query.userId};
        const data = await messageCollection.findOne(query)
        response.send({result: data})
    }
    catch(error) {
        console.log(error);
    }
})

messageRouter.post('/sendMessage', jsonParser, async (request, response) => {
    try {
        let userExist = false;
        let messageDetail = [];
        await mongoClient.connect();
        database = mongoClient.db('dunphyDatabase');
        messageCollection = database.collection('messageCollection');
        const data = new MessageModel(request.body);
        const allData = await messageCollection.find({}).toArray();
        allData.map(item => {
            if(item._id == data._id) {
                userExist = true;
                item.messageDetail.push(data.messageDetail[0]);
                messageDetail = item.messageDetail;
            }
        })
        if(userExist) {
            messageCollection.updateOne({_id: data._id}, {$set: {messageDetail: messageDetail}}, (result, error) => {
                if(error) {
                    console.log('Something went wrong.')
                }
            });
        }
        else {
            messageCollection.insertOne(data, (result, error) => {
                if(error) {
                    console.log('Something went wrong.')
                }
            });
        }
        response.send({result: data})
    }
    catch(error) {
        console.log(error);
    }
})

export default messageRouter;