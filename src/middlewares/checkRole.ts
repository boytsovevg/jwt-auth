import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';

export const checkRole = (roles: Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOne(id);
        } catch (id) {
            res.status(401).send();
        }

        if (roles.includes(user.role)) {
            next();
        } else {
            res.status(401).send();
        }
    };
};
