import express from 'express';

const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../backend/controllers/productController';
import { protect, admin } from '../backend/middleware/authMiddleware.js';

describe('Test ruta producto', function () {

  test('responde a /', async () => {

    router.route('/').get(getProducts).post(protect, admin, createProduct);
    router
      .route('/:id')
      .get(getProductById)
      .delete(protect, admin, deleteProduct)
      .put(protect, admin, updateProduct);

    }); 

});

export default router;
