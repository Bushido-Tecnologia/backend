import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '../../constants';
import { User } from '../types/User';
import { JWTPayload } from '../types/jwtPayload';

class JWTService {
    public generate(payload: JWTPayload) {
        return jwt.sign(payload, JWT_SECRET_TOKEN, { expiresIn: '1d',  })
    }

    public verify(token: string) {
        const [_, tokenValue] = token?.split(' ');

        return jwt.verify(tokenValue, JWT_SECRET_TOKEN) as JWTPayload;
    }

    public decoded(token: string) {
        const [_, tokenValue] = token?.split(' ');

        return jwt.decode(tokenValue) as JWTPayload;
    }
}

export const jwtService = new JWTService()