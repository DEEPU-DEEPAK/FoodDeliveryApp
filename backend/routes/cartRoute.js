import express from 'express';
import {
  addToCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from '../controller/cartController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get cart & Add to cart
router.route('/')
  .get(authMiddleware, getCart)
  .post(authMiddleware, addToCart);

// Clear entire cart
router.post('/clear', authMiddleware, clearCart);

// Update quantity or delete item from cart
router.route('/:id')
  .put(authMiddleware, updateCartItem)
  .delete(authMiddleware, deleteCartItem);

export default router;
