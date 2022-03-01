import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import UserModel from '../models/UserModel.js';

const jsonParser = bodyParser.json();
const userRouter = express.Router();

const mongoUri = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongoUri);
let database;
let userCollection;

userRouter.post('/validateUsername', jsonParser, async (request, response) => {
    try {
        let userExist = false;
        await mongoClient.connect();
        database = mongoClient.db('dunphyDatabase');
        userCollection = database.collection('userCollection');
        const data = new UserModel(request.body);
        const allUsers = await userCollection.find({}).toArray();
        allUsers.map(item => {
            if(item._id == data._id) {
                userExist = true;
            }
        })
        response.send({result: userExist});
    }
    catch(error) {
        console.log(error)
    }
});

userRouter.post('/validateUser', jsonParser, async (request, response) => {
    try {
        let userExist = false;
        await mongoClient.connect();
        database = mongoClient.db('dunphyDatabase')
        userCollection = database.collection('userCollection');
        const data = new UserModel(request.body);
        const allUsers = await userCollection.find({}).toArray();
        allUsers.map(item => {
            if(item._id == data._id && item.password == data.password) {
                userExist = true;
            }
        })
        mongoClient.close();
        response.send({result: userExist})
    }
    catch(error) {
        console.log(error);
    }
});

userRouter.post('/insertUser', jsonParser, async (request, response) => {
    try {
        await mongoClient.connect();
        database = mongoClient.db('dunphyDatabase');
        userCollection = database.collection('userCollection');
        const data = new UserModel(request.body);
        userCollection.insertOne(data, (error, result) => {
            if(error) {
                console.log(error);
            }
            mongoClient.close();
            response.send({result: result});
        })
    }
    catch(error) {
        console.log(error);
    }
});

userRouter.get('/checkFriends', jsonParser, async (request, response) => {
    try {
        let friends = [];
        let userData;
        await mongoClient.connect();
        database = mongoClient.db('dunphyDatabase');
        userCollection = database.collection('userCollection');
        const allUsers = await userCollection.find({}).toArray();
        const userId = request.query._id;
        allUsers.map(item => {
            if(item._id == userId) {
                userData = item;
            }
        })
        for(let item of allUsers) {
            if(item._id == userId) {
                continue;
            }
            for(let i of userData.interests) {
                if(item.interests.includes(i)) {
                    friends.push(item);
                    break;
                }
            }
        }
        response.send({result: friends});
    }
    catch(error) {
        console.log(error);
    }
})



export default userRouter;