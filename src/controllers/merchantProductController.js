import MerchantProduct from '../models/MerchantProduct.js';
import Product from '../models/Product.js';

// Add a single product with merchant-specific price and quantity
// Fetch selected product(s) info from global product collection
export const addMerchantProduct = async (req, res) => {
  const { productIds } = req.body;

  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ success: false, message: 'Product IDs are required as an array' });
  }

  try {
    const products = await Product.find({ _id: { $in: productIds } });

    res.status(200).json({
      success: true,
      message: 'Selected product(s) fetched',
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching products', error });
  }
};

// Map multiple products with default price/quantity = 0
// Map product(s) to merchant with specific price/quantity/description
export const mapProductsToMerchant = async (req, res) => {
  const { products } = req.body; // array of { productId, price, quantity, description }
  const { merchantId } = req.params;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ success: false, message: 'Products array is required' });
  }

  try {
    const merchantProducts = await Promise.all(products.map(async (item) => {
      const { productId, price = 0, quantity = 0, description = '' } = item;

      const productExists = await Product.exists({ _id: productId });
      if (!productExists) {
        throw new Error(`Product not found: ${productId}`);
      }

      return await MerchantProduct.create({
        merchant: merchantId,
        product: productId,
        price,
        quantity,
        description,
      });
    }));

    res.status(201).json({
      success: true,
      message: 'Products mapped to merchant successfully',
      merchantProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while mapping products', error: error.message });
  }
};
