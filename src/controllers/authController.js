import Merchant from '../models/Merchant.js';
import generateToken from '../../utils/generateToken.js';

// Admin login controller
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = generateToken('admin-id', 'admin');
    return res.status(200).json({
      success: true,
      message: 'Admin logged in successfully',
      token,
      role: 'admin',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid admin credentials',
  });
};

// Merchant login controller
export const merchantLogin = async (req, res) => {
   console.log('req.body:', req.body);
  const { email, password } = req.body;

  try {
    const merchant = await Merchant.findOne({ email });
    if (!merchant || !(await merchant.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid merchant credentials',
      });
    }

    const token = generateToken(merchant._id, 'merchant');
    return res.status(200).json({
      success: true,
      message: 'Merchant logged in successfully',
      token,
      role: 'merchant',
      merchantId: merchant._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during merchant login',
    });
  }
};
