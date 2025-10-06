import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './db/dbConnection.js';

dotenv.config();

const app = express();
app.use(express.json());

dbConnection;

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World! Yousef');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




