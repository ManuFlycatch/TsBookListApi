import express from 'express';
import controller from '../controllers/user'
const router = express.Router()

router.post('/users', controller.createUser )
router.get('/users', controller.getUser)
router.get('/users/login', controller.loginUser)


export default router; 