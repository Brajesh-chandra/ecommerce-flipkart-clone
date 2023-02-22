import express from 'express';
import { userSignup, userLogin, userData, userLogout} from '../controller/user-controller.js';
import { getProducts, getProductById } from '../controller/product-controller.js';
import middleware from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

router.get('/api/getUserData',middleware, userData);

router.get('/api/logout',userLogout);

export default router;