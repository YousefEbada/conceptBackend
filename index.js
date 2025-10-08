import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './db/dbConnection.js';
import cors from 'cors';
import userRoutes from './src/modules/user/user.route.js';
import serviceRoutes from './src/modules/service/service.route.js';
import projectRoutes from './src/modules/project/project.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "conceptccc.com",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

dbConnection;

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World! Yousef');
});

// Health check for Postman
app.get('/api/health', (req, res) => {
    res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

app.use('/api/auth', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




