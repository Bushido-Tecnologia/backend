import { jwtService } from "../../models/services/JWTService";
import { Controller } from "../../models/types/controller";

class AuthenticationMiddleware{
    public handler:Controller = (req, res, next) => {
        const [_,token] = req.headers['authorization']?.split(' ') as string[];

        if (!token){
            res.status(401).json({message: 'invalid-token'})
            return;
        }

        const user = jwtService.verify(token);
        if (user) {
            next();
        } else {
            res.status(403).json({message: 'forbidden-resource'});
        }
    }
}

export const authenticationMiddleware = new AuthenticationMiddleware()