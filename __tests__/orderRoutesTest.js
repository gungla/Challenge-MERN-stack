import express from 'express';

const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../backend/controllers/orderController.js';
import { protect, admin } from '../backend/middleware/authMiddleware.js';

describe('Test ruta order', function () {

  test('responde a /', async () => {

    router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
    router.route('/myorders').get(protect, getMyOrders);
    router.route('/:id').get(protect, getOrderById);
    router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

  }); 

});

export default router;
