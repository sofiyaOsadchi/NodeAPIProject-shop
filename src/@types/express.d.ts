import { IJWTPayload, IProduct, IUser } from "./@types";

declare global{
    namespace Express{
        interface Request {
            payload?: IJWTPayload
            user?: IUser; 
            product: IProduct;
        }
    }
}