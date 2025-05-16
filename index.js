import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/db.js';
import merchantRoutes from './src/routes/merchantRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Default route
app.get('/', (req, res) => {
  res.send('Hello, Node.js Backend!');
});



app.use('/api/auth', authRoutes);
app.use('/api/merchants', merchantRoutes);


const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Server is not connected:', error);
  });
