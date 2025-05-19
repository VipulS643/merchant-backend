import Offer from '../models/Offer.js';

export const createOffer = async (req, res) => {
  const {
    merchant,
    appliesToAll,
    products,
    discountPercentage,
    startDate,
    endDate,
    title,
    description,
  } = req.body;

  // Debug logs
  console.log('req.body.products:', req.body.products);
  console.log('typeof:', typeof req.body.products);

  const parsedProducts =
    appliesToAll === 'true' || appliesToAll === true
      ? []
      : Array.isArray(products)
        ? products
        : [products];

  try {
    const offer = new Offer({
      merchant,
      appliesToAll: appliesToAll === 'true' || appliesToAll === true,
      products: parsedProducts,
      discountPercentage,
      startDate,
      endDate,
      image: req.files?.image?.[0]?.path || '',
      title,
      description,
    });

    await offer.save();

    res.status(201).json({ success: true, message: 'Offer created', offer });
  } catch (error) {
    console.error('Offer creation error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};