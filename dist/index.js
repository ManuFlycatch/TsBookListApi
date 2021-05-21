import express from 'express';
import './db/mongoose';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('express app is running');
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
