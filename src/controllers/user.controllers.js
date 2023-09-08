import { getUserbyId, getUsers, createUser, deleteUser, updatedUser } from "../models/User.models.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        if (!users) {
            return res.status(404).json({
                message: "No se encontraron usuarios"
            })
        }
        return res.status(200).json({
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al obtener los usuarios"
        })
    }
};
export const getUser = async (req, res) => {
    try {
        const user = await getUserbyId(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "No se encontró el usuario"
            })
        };
        return res.status(200).json({
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al obtener el usuario"
        })
    }
};
export const createNewUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        if (!user) {
            return res.status(404).json({
                message: "Error al crear el usuario"
            })
        };
        return res.status(201).json({
            message: "Usuario creado",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al crear el usuario"
        })
    }
}
export const updateUserbyId = async (req, res) => {
    try {
        const user = await getUserbyId(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "No se encontró el usuario"
            })
        };
        const updated = await updatedUser(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({
                message: "Error al actualizar el usuario"
            })
        };
        return res.status(200).json({
            message: "Usuario actualizado",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al actualizar el usuario"
        })
    }
};
export const deleteUserbyId = async (req, res) => {
    try {
        const user = await getUserbyId(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "No se encontró el usuario"
            })
        };
        const deletedUser = await deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "Error al eliminar el usuario"
            })
        };
        return res.status(200).json({
            message: "Usuario eliminado"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al eliminar el usuario"
        });
    };
};