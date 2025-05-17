import Product from '../models/Product.js';

export const addProductToGlobalCollection = async (req, res, next) => {
  const { name, description, category, basePrice } = req.body;

  if (!name || !category || !basePrice) {
    return res.status(400).json({
      success: false,
      message: 'Name, category and base price are required',
    });
  }

  try {
    const product = new Product({
      name,
      description,
      category,
      basePrice,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added to global collection',
      product,
    });
  } catch (error) {
    next(error);
  }
};
