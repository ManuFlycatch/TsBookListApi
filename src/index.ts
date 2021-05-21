import express, { Request, Response} from 'express';
import './db/mongoose'
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('express app is running')
})

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
})