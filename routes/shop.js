const path = require('node:path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
 //Dynamic routing with product id
router.get('/products/:productId',shopController.getProduct);


router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCard);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
