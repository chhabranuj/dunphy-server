import cors from 'cors';
import express from 'express';
import userRouter from './routes/UserRouter.js';
import messageRouter from './routes/MessageRouter.js';
import interestsRouter from './routes/InterestsRouter.js';

const app = express();
app.use(cors());

app.use('/user', userRouter);
app.use('/interests', interestsRouter);
app.use('/message', messageRouter);

app.listen(5002, () => {
    console.log('Server listening on port: 5000');
});