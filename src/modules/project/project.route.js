import express from 'express';
import { requireAuth } from '../../middlewares/auth.js';
import { createProject, updateProject, deleteProject, listProjects, getProject } from './project.controller.js';

const router = express.Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', requireAuth(['admin', 'manager']), createProject);
router.put('/:id', requireAuth(['admin', 'manager']), updateProject);
router.delete('/:id', requireAuth(['admin', 'manager']), deleteProject);

export default router;
