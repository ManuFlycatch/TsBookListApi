import express from 'express';
import controller from '../controllers/user';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();
router.post('/users', controller.createUser);
router.get('/users', authMiddleware, controller.getUser);
router.get('/users/login', controller.loginUser);
router.get('/users/me', controller.readUser);
export default router;
