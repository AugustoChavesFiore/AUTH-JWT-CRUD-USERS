import { Router } from 'express';
import { login, newUser } from '../controllers/auth.controllers.js';
import { validateFields } from '../middlewares/validator.js';
import { loginUserSchema, userSchema } from '../schemas/User.schema.js';

const authRouter = Router();

authRouter.post('/',userSchema,validateFields, newUser);
authRouter.post('/login',loginUserSchema,validateFields, login);


export {authRouter};