import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './db/dbConnection.js';
import cors from 'cors';
import multer from 'multer';
import userRoutes from './src/modules/user/user.route.js';
import serviceRoutes from './src/modules/service/service.route.js';
import projectRoutes from './src/modules/project/project.route.js';
import { ServiceModel } from './db/models/service.model.js';
import { ProjectModel } from './db/models/project.model.js';
// import { sendContactMail } from './src/utilities/Email/sendMail.js';
// import { emailTemplate } from './src/utilities/Email/emailTemplate.js';

dotenv.config();

const app = express();
app.use(express.json());

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
app.use(cors({
    origin: ["https://conceptccc.com", "https://www.conceptccc.com"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
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

// Image serving endpoints
app.get('/api/images/service/:id', async (req, res) => {
  try {
    const service = await ServiceModel.findById(req.params.id);
    if (!service || !service.image || !service.image.data) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', service.image.contentType);
    res.send(service.image.data);
  } catch (error) {
    res.status(500).json({ message: 'Error serving image' });
  }
});

app.get('/api/images/project/:id', async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project || !project.image || !project.image.data) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', project.image.contentType);
    res.send(project.image.data);
  } catch (error) {
    res.status(500).json({ message: 'Error serving image' });
  }
});

app.use('/api/auth', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, phone, jobTitle, brandName } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: name, email, subject, message' 
      });
    }

    const html = emailTemplate({ 
      name, 
      email, 
      subject, 
      message, 
      phone: phone || "N/A", 
      jobTitle: jobTitle || "N/A", 
      brandName: brandName || "N/A" 
    });

    await sendContactMail({ 
      name, 
      email, 
      subject, 
      message, 
      phone: phone || "N/A", 
      jobTitle: jobTitle || "N/A", 
      brandName: brandName || "N/A", 
      html 
    });

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to send message' 
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




