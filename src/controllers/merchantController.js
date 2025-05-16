import Merchant from '../models/Merchant.js';

export const addMerchant = async (req, res) => {
  const { name, phone, storeLocation, email, password } = req.body;

  if (!name || !phone || !storeLocation || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    // Check if merchant with email exists
    const existingMerchant = await Merchant.findOne({ email });
    if (existingMerchant) {
      return res.status(400).json({ success: false, message: 'Merchant email already exists' });
    }

    const merchant = new Merchant({
      name,
      phone,
      storeLocation,
      email,
      password,
    });

    await merchant.save();

    res.status(201).json({
      success: true,
      message: 'Merchant added successfully',
      merchant: {
        id: merchant._id,
        name: merchant.name,
        phone: merchant.phone,
        storeLocation: merchant.storeLocation,
        email: merchant.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
export const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find().select('-password'); 
    res.status(200).json({ success: true, merchants });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch merchants', error });
  }
};
