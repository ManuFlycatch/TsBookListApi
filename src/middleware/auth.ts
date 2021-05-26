import { Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';


interface Idecoded{
    _id:string;
    iat:number;
}


export const authMiddleware = async(req:Request, res: Response, next:NextFunction) =>{
    
    console.log('auth middleware');
    const token = req.header('Authorization')?.replace('Bearer', '')
    if(!token)
    {
        return res.status(401).json('Access denied..')
    }
    const decoded= jwt.verify(token,'thisismysecret') as Idecoded;
    const user= await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if(!user)
    {
        return res.status(404).send('user not found...')
    }
    console.log(user)

    
    req.user = user
    
   
    next()
}