import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './db/dbConnection.js';
import cors from 'cors';
import userRoutes from './src/modules/user/user.route.js';
import serviceRoutes from './src/modules/service/service.route.js';
import projectRoutes from './src/modules/project/project.route.js';
import { sendContactMail } from './src/utilities/Email/sendMail.js';
import { emailTemplate } from './src/utilities/Email/emailTemplate.js';

dotenv.config();

const app = express();
app.use(express.json());
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




