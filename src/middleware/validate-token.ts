import { RequestHandler, Request } from "express";
import BizCardsError from "../errors/BizCardsError";
import { authService } from "../services/auth-service";

const extractToken = (req: Request) => {
  const authHeader = req.header("x-auth-token");

  if (authHeader && authHeader.length > 0) {
    return authHeader;
  }

  throw new BizCardsError(400, "x-auth-token header is missing");
};

const validateToken: RequestHandler = (req, res, next) => {
  try {
    //extract the token from the x-auth-token header:
    const token = extractToken(req);

    //check that the token is valid, and extract it's payload:
    const payload = authService.validateJWT(token);

    //add the data to the request =>
    //available to the next steps in the middleware chain
    req.payload = payload;

    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken, extractToken };
