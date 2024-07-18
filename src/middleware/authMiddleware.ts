import { Request, Response, NextFunction } from 'express';
import { IUser } from '../@types/@types';

// Middleware to authenticate user
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    // Implement user authentication here
    // לדוגמה, נוסיף את המשתמש ל-request:
    req.user = {
        _id: 'exampleUserId',
        email: 'example@example.com',
        phone: '1234567890',
        password: 'hashedpassword',
        address: {
            street: 'Example Street',
            city: 'Example City',
            country: 'Example Country',
            houseNumber: 1,
        },
        name: {
            first: 'Example',
            last: 'User',
        },
        createdAt: new Date(),
        isAdmin: false,
        cart: [],
    } as IUser;
    next();
};

export default authenticateUser;
