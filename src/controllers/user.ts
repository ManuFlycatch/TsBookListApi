import { Request,Response,NextFunction} from 'express';
import mongoose from 'mongoose';
import User from '../models/user'



const createUser = async (req: Request,res: Response, next: NextFunction) => {

    
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch (err)
    {
        res.status(400).send(err)
    }

}
const getUser = async (req: Request,res: Response,next: NextFunction) => {

    try {
        const user = await User.find({})
        res.status(201).send(user)
    }
    catch(err)
    {
        res.status(500).send()
    }
    
}

const loginUser = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch(err)
    {
        res.status(404).send(err)
    }
   
}

const readUser = async(req:Request, res:Response,next: NextFunction) => {
    res.send(req.user)
}




export default { createUser, getUser, loginUser, readUser }