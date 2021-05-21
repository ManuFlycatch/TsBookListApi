import express from 'express';
import './db/mongoose';
import userRouter from './routes/user';
import bodyParser from 'body-parser';
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRouter);
app.get('/', (req, res) => {
    res.send('express app is running');
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
