import { Request, Response,NextFunction } from "express";
export function myMyMiddleware(request:Request, response:Response, next:NextFunction) {
    console.log("Executando");
    request.user_id = "123456";
    return next();
}