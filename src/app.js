import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './db.js';
import {authRouter} from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLogs } from './helpers/createLogs.js';
import { handleErrors } from './middlewares/handleErrors.js';


const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined',{
    stream: {
        write: (message) => {
            createLogs(message,__dirname, 'logs');
        }
    }
}));
app.use(cors());
app.use(handleErrors);
connectDB();

app.use('/auth', authRouter);
app.use('/user',userRouter)
app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`);
});