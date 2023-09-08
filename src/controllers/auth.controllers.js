import { createJWT } from "../helpers/jwt.js";
import {createUser, loginUser,getUserbyId} from "../models/User.models.js";

export const newUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        if  (!user){
            return res.status(400).json({
                message: "No se pudo crear el usuario o el usuario ya existe",
            });
        }
        const token = await createJWT({id: user.id});
        return res.status(201).json({
            message: "Usuario creado",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'No se pudo crear el usuario'
        }, error);
    }
};
export const login = async (req, res) => {
try {
    const existingUser= await loginUser(req.body.username, req.body.password);
    if (!existingUser){
        return res.status(400).json({
            message: 'Usuario o contraseña incorrecta',
        });
    }
    const token = await createJWT({id: existingUser.id});
    return res.status(200).json({
        message: 'Usuario logueado',
        token:token.token
    });
} catch (error) {
    console.log(error);
    return res.status(500).json({
        message: 'No se pudo loguear el usuario'
    });
}
};

export const getUserInfoByToken = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(404);
    };
    const { user: userId } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await getUserbyId(userId)
    if (!user) {
        return res.sendStatus(403);
    };
    req.user = user;
    next()
}