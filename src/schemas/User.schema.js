import {body} from 'express-validator';

export const userSchema = [
    body('username').exists().notEmpty().withMessage('El usuario es obligatorio'),
    body('email').exists().isEmail().withMessage('El email es obligatorio'),
    body('password').exists().notEmpty().withMessage('La contraseña es obligatoria').isLength(8).withMessage('La contraseña debe tener al menos 8 caracteres'),
];

export const loginUserSchema =[
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('username').notEmpty().withMessage('El usuario es obligatorio'),

]

export const updateUserSchema = [
    body('username').optional().notEmpty().withMessage('El usuario es obligatorio'),
    body('email').optional().isEmail().withMessage('El email es obligatorio'),
    body('password').optional().notEmpty().withMessage('La contraseña es obligatoria').isLength(8).withMessage('La contraseña debe tener al menos 8 caracteres'),
];
