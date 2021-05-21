var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user';
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User(req.body);
    return user.save()
        .then((result) => {
        return res.status(201).json({
            user: result
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    User.find()
        .exec()
        .then((result) => {
        return res.status(200).json({
            result
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
export default { createUser, getUser };
