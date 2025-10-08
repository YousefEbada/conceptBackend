import express from 'express';
import multer from 'multer';
import { requireAuth } from '../../middlewares/auth.js';
import { createProject, updateProject, deleteProject, listProjects, getProject } from './project.controller.js';

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

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', requireAuth(['admin', 'manager']), upload.single('image'), createProject);
router.put('/:id', requireAuth(['admin', 'manager']), upload.single('image'), updateProject);
router.delete('/:id', requireAuth(['admin', 'manager']), deleteProject);

export default router;
