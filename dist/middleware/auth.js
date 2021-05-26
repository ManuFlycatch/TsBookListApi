var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import User from '../models/user';
export const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('auth middleware');
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '');
    if (!token) {
        return res.status(401).json('Access denied..');
    }
    const decoded = jwt.verify(token, 'thisismysecret');
    const user = yield User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
        return res.status(404).send('user not found...');
    }
    console.log(user);
    req.user = user;
    next();
});
