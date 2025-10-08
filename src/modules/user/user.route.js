import express from 'express';
import { createUser, login, getUsers, updateUser, deleteUser } from './user.controller.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = express.Router();

// Login issues JWT with email and role
router.post('/login', login);

// Manager-only endpoints for admin management
router.post('/', requireAuth(['manager']), createUser);
router.get('/', requireAuth(['manager']), getUsers);
router.put('/:id', requireAuth(['manager']), updateUser);
router.delete('/:id', requireAuth(['manager']), deleteUser);

export default router;
