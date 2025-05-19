import express from 'express';
import { createOffer } from '../controllers/offerController.js';
// import { upload } from '../utils/multer.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../../utils/multer.js';

const router = express.Router();

router.post(
  '/',
  verifyAdmin,
  upload.fields([{ name: 'image', maxCount: 1 }]),
  createOffer
);

export default router;
