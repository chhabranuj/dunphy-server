import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import InterestsModel from '../models/InterestsModel.js';

const jsonParser = bodyParser.json();
const interestsRouter = express.Router();

const mongoUri = "mongodb://localhost:27017";
const mongoClient = new MongoClient(mongoUri);
let database;
let interestCollection;

interestsRouter.post("/insertInterests", jsonParser, async (request, response) => {
    try {
        await mongoClient.connect();
        database = mongoClient.db("dunphyDatabase");
        interestCollection = database.collection("interestsCollection");
        const data = new InterestsModel(request.body);
        interestCollection.insertOne(data, (error, result) => {
            if(error) {
                console.log("Something Went Wrong");
            }
            response.send({result: result});
            mongoClient.close();
        });
    }
    catch(error) {
        console.log(error)
    }
});

interestsRouter.get("/insertAllInterests", jsonParser, async (request, response) => {
    try {
        await mongoClient.connect();
        database = mongoClient.db("dunphyDatabase");
        interestCollection = database.collection("interestsCollection");
        const data = [
            new InterestsModel({_id: 'python', interestName: 'Python'}),
            new InterestsModel({_id: 'js', interestName: 'JavaScript'}),
            new InterestsModel({_id: 'flutter', interestName: 'Flutter'}),
            new InterestsModel({_id: 'java', interestName: 'Java'}),
            new InterestsModel({_id: 'c++', interestName: 'C++'}),
            new InterestsModel({_id: 'dart', interestName: 'Dart'}),
            new InterestsModel({_id: 'ruby', interestName: 'Ruby'}),
            new InterestsModel({_id: 'kotlin', interestName: 'Kotlin'}),
            new InterestsModel({_id: 'azure', interestName: 'Azure'}),
            new InterestsModel({_id: 'aws', interestName: 'AWS'}),
            new InterestsModel({_id: 'node', interestName: 'Node'}),
            new InterestsModel({_id: 'mongodb', interestName: 'MongoDb'}),
            new InterestsModel({_id: 'ai', interestName: 'Artificial Intelligence'}),
            new InterestsModel({_id: 'ml', interestName: 'Machine Learning'}),
            new InterestsModel({_id: 'rpa', interestName: 'Robotics Process Automation'}),
            new InterestsModel({_id: 'ec', interestName: 'Edge Computing'}),
            new InterestsModel({_id: 'qc', interestName: 'Quantum Computing'}),
            new InterestsModel({_id: 'vr', interestName: 'Virtual Reality'}),
            new InterestsModel({_id: 'ar', interestName: 'Augmented Reality'}),
            new InterestsModel({_id: 'bc', interestName: 'Blockchain'}),
            new InterestsModel({_id: 'iot', interestName: 'Internet of Things'}),
            new InterestsModel({_id: 'cs', interestName: 'Cyber Security'}),
            new InterestsModel({_id: 'eh', interestName: 'Ethical Hacking'}),
        ];
        interestCollection.insertMany(data, (error, result) => {
            if(error) {
                console.log("Something Went Wrong");
            }
            response.send({result: result});
            mongoClient.close();
        });
    }
    catch(error) {
        console.log(error)
    }
});

interestsRouter.get("/getInterests", jsonParser, async (request, response) => {
    try {
        await mongoClient.connect();
        database = mongoClient.db("dunphyDatabase");
        interestCollection = database.collection("interestsCollection");
        const result = await interestCollection.find({}).toArray();
        response.send({result: result});
    }
    catch(error) {
        console.log(error)
        response.send("Something Went Wrong");
    }
});

interestsRouter.get("/getInterestsById", jsonParser, async (request, response) => {
    try {
        await mongoClient.connect();
        database = mongoClient.db("dunphyDatabase");
        interestCollection = database.collection("interestsCollection");
        const query = {_id: request.query.id}
        const result = await interestCollection.findOne(query)
        response.send({result: result});
    }
    catch(error) {
        console.log(error)
        response.send("Something Went Wrong");
    }
});

export default interestsRouter;