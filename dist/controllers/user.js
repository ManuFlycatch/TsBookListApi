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
    try {
        yield user.save();
        const token = yield user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.find({});
        res.status(201).send(user);
    }
    catch (err) {
        res.status(500).send();
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByCredentials(req.body.email, req.body.password);
        const token = yield user.generateAuthToken();
        res.send({ user, token });
    }
    catch (err) {
        res.status(404).send(err);
    }
});
const readUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.user);
});
export default { createUser, getUser, loginUser, readUser };
