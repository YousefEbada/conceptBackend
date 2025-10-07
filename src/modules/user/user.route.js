import express from 'express';
import { createUser, login, getUsers, updateUser, deleteUser } from './user.controller.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = express.Router();

// Login issues JWT with email and role
router.post('/login', login);

// Manager-only endpoints for admin management
router.post('/createuser', createUser);
router.get('/getusers', getUsers);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

export default router;
