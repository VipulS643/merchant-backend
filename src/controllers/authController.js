import Merchant from '../models/Merchant.js';
import { generateToken, generateRefreshToken } from '../../utils/generateToken.js';


// Admin login controller
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = generateToken('admin-id', 'admin');
    const refreshToken = generateRefreshToken('admin-id', 'admin');

    return res.status(200).json({
      success: true,
      message: 'Admin logged in successfully',
      token,
      refreshToken,
      role: 'admin',
      adminId: 'admin-id',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid admin credentials',
  });
};

// Merchant login controller
export const merchantLogin = async (req, res) => {
  const { email, password } = req.body;
  const merchant = await Merchant.findOne({ email });

  if (!merchant || !(await merchant.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken(merchant._id, 'merchant');
  const refreshToken = generateRefreshToken(merchant._id, 'merchant');

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    refreshToken,
    role: 'merchant',
    merchantId: merchant._id,
  });
};