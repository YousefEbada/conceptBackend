import express from 'express';
import multer from 'multer';
import { requireAuth } from '../../middlewares/auth.js';
import { createService, updateService, deleteService, listServices, getService } from './service.controller.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

router.get('/', listServices);
router.get('/:id', getService);
router.post('/', requireAuth(['admin', 'manager']), upload.single('image'), createService);
router.put('/:id', requireAuth(['admin', 'manager']), upload.single('image'), updateService);
router.delete('/:id', requireAuth(['admin', 'manager']), deleteService);

export default router;
