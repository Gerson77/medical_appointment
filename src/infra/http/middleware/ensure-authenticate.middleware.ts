import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../errors/custom.error";
import { JWTToken } from "../../shared/token/jwt.token";

export const ensureAuthenticate = (request: Request, response: Response, next: NextFunction) => {
    // Receber o token
    // Validar se o token esta correto
    // se correto passa para as rotas ou retornar com erro

    const headerAuth = request.headers.authorization

    if(!headerAuth) {
        return response.status(401).json({
            error: 'Token is missing'
        })
    }

    const [, token] = headerAuth.split(" ")

    if(!token) {
        return response.status(401).json({
            error: 'Token is missing'
        })
    }

    const verifyToken = new JWTToken().valite(token)

    if(verifyToken) {
        request.userId = verifyToken.sub
        return next();
    }
    
    return response.status(401).json({
        error: "Token is invalid!"
    })
}