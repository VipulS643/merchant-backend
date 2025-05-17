import express from 'express';
import { addProductToGlobalCollection } from '../controllers/productController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only admin can add products to global collection
router.post('/', verifyAdmin, addProductToGlobalCollection);

export default router;
