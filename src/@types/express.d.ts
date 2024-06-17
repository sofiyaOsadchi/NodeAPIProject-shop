import { IJWTPayload } from "./@types";

declare global{
    namespace Express{
        interface Request {
            payload?: IJWTPayload
        }
    }
}