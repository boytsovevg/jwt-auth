import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt-config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = <string>req.header['auth'];
    let payload;

    try {
        payload = jwt.verify(token, jwtConfig.secret);
        res.locals.jwtPayload = payload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { userId, username } = payload;
    const newToken = jwt.sign({ userId, username }, jwtConfig.secret, {
        expiresIn: '1h'
    });

    res.setHeader('token', newToken);
    next();
};
