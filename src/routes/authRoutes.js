import express from 'express';
import { adminLogin, merchantLogin } from '../controllers/authController.js';

const router = express.Router();

// Admin login
router.post('/admin/login', adminLogin);

// Merchant login
router.post('/merchant/login', merchantLogin);

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ success: false, message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = generateToken(decoded.id, decoded.role);

    res.status(200).json({
      success: true,
      token: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid refresh token' });
  }
});

export default router;
