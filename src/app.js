import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './db.js';
import {authRouter} from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());

connectDB();

app.use('/auth', authRouter);
app.use('/user',userRouter)
app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`);
});