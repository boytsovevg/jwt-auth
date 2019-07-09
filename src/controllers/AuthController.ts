import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import jwtConfig from '../config/jwt-config';

class AuthController {

    public login = async (req: Request, res: Response) => {

        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }

        const userRepository = getRepository(User);

        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
            res.status(401).send();
        }

        if (!user.passwordValid(password)) {
            res.status(401).send();
            return;
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            jwtConfig.secret,
            { expiresIn: '1h' }
        );

        res.send(token);
    };

    public changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.userId;

        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        const userRepository = getRepository(User);

        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        if (!user.passwordValid(oldPassword)) {
            res.status(401).send();
            return;
        }

        user.updatePassword(newPassword);

        const errors = await validate(user);

        if (errors.length) {
            res.status(400).send(errors);
            return;
        }

        userRepository.save(user);

        res.status(204).send();
    };
}
export default new AuthController();
