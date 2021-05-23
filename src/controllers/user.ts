import { Request,Response,NextFunction} from 'express';
import mongoose from 'mongoose';
import User from '../models/user'


const createUser = async (req: Request,res: Response, next: NextFunction) => {

    
    const user = new User(req.body)

    return user.save()
        .then((result) => {
            return res.status(201).json({
                user: result
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })



}
const getUser = async (req: Request,res: Response,next: NextFunction) => {

    User.find()
        .exec()
        .then((result) => {
            return res.status(200).json({
                 result
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}




export default { createUser, getUser }