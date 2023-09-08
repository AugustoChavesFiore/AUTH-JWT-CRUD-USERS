import { Router } from 'express';
import { createNewUser, deleteUserbyId, getAllUsers, getUser, updateUserbyId } from '../controllers/user.controllers.js';
import { updateUserSchema, userSchema } from '../schemas/User.schema.js';
import { validateFields } from '../middlewares/validator.js';
const userRouter = Router();

userRouter.get('/all', getAllUsers);
userRouter.get('/:id',  getUser);
userRouter.post('/',userSchema,validateFields, createNewUser);
userRouter.put('/:id',updateUserSchema,validateFields, updateUserbyId);
userRouter.delete('/:id', deleteUserbyId);

export  {userRouter};