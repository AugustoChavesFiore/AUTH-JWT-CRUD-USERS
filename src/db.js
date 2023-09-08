import { Sequelize } from 'sequelize';

export const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT 
    });  

export const connectDB= async()=>{
    try {
        await sequelize.sync()
        console.log(`DB CONNECTED`);
    } catch (error) {
        console.log('Error Conecting',error);
    }
}