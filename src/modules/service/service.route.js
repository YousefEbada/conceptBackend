import express from 'express';
import { requireAuth } from '../../middlewares/auth.js';
import { createService, updateService, deleteService, listServices, getService } from './service.controller.js';

const router = express.Router();

router.get('/', listServices);
router.get('/:id', getService);
router.post('/', requireAuth(['admin', 'manager']), createService);
router.put('/:id', requireAuth(['admin', 'manager']), updateService);
router.delete('/:id', requireAuth(['admin', 'manager']), deleteService);

export default router;
