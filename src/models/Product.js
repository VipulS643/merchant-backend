import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required'],
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
