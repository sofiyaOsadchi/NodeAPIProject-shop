import express, { Request, Response, NextFunction } from 'express';
import { getCart, addProductToCart, removeProductFromCart, clearCart } from '../services/cart-service';
import { IUser } from '../@types/@types';
import authenticateUser from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateUser);

router.get('/', async (req: Request, res: Response) => {
    try {
        const cart = await getCart(req.user!._id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await addProductToCart(req.user!._id, productId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/remove', async (req: Request, res: Response) => {
    try {
        const { productId } = req.body;
        const cart = await removeProductFromCart(req.user!._id, productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/clear', async (req: Request, res: Response) => {
    try {
        const cart = await clearCart(req.user!._id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;