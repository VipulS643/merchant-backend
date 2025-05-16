import express from 'express';
import { adminLogin, merchantLogin } from '../controllers/authController.js';

const router = express.Router();

// Admin login
router.post('/admin/login', adminLogin);

// Merchant login
router.post('/merchant/login', merchantLogin);

export default router;
