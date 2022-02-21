import cors from 'cors';
import express from 'express';
import interestsRouter from './routes/InterestsRouter.js';

const app = express()
app.use(cors())

app.use("/interests",interestsRouter)

app.listen(5000, () => {
    console.log("Server listening on port: 5000");
});