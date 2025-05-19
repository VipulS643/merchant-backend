// routes/merchantProductRoutes.js
import express from 'express';
import { addMerchantProduct, mapProductsToMerchant } from '../controllers/merchantProductController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:merchantId/products', verifyToken, addMerchantProduct);
router.post('/:merchantId/map-products', verifyToken, mapProductsToMerchant);

export default router;
