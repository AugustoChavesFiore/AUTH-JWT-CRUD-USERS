import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { hash, matchCompare } from "../helpers/cryp.js";


export const roles = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: roles.USER

    }
},
    {
        timestamps: true
    }
);
//log
export const createUser = async (user) => {
    try {
        const existingUser = await User.findOne({
            where: {
                email: user.email,
            }
        });
        if (existingUser) {
            return null;
        };
        const hashedPassword = await hash(user.password, 10);
        const newUser = await User.create({
            ...user, password: hashedPassword
        })
        if (!newUser) {
            return null;
        }
        return newUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const loginUser = async (user,password) => {
    try {
        const existingUser = await User.findOne({
            where: {
                username: user,
            }
        })
        if (!existingUser) {
            return false;
        }
        const match = await matchCompare(password, existingUser.password);
        if (!match) {
            return false;
        }
        return existingUser
    } catch (error) {
        console.log(error);
        return false;
    }
};
//crud
export const getUsers = async () => {
    try {
        const users = await User.findAll();
        if (!users) {
            return null;
        }
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const getUserbyId=async (id)=>{
    try {
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            return null;
        }
        return existingUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const updatedUser=async (id,user)=>{
    try {
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            return null;
        };
        const hashedPassword = await hash(user.password, 10);
        const updatedUser = await User.update({...user,password:hashedPassword},{
            where:{
                id
            }
        });
        if (!updatedUser) {
            return null;
        }
        return updatedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const deleteUser=async (id)=>{
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        const deletedUser = await User.destroy({
            where:{
                id
            }
        });
        if (!deletedUser) {
            return null;
        }
        return deletedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};
