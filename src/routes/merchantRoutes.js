import express from 'express';
import { addMerchant, getAllMerchants } from '../controllers/merchantController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createMerchant', verifyAdmin, addMerchant);
router.get('/getAllMerchants', verifyAdmin, getAllMerchants);

export default router;
