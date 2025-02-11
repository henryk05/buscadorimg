import express from 'express';
import { searchImages, getProducts } from '../controllers/mainController.js';

const router = express.Router();

router.get('/search-images', searchImages);
router.get('/api/products', getProducts);

export default router;