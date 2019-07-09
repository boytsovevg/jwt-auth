import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';

class UserController {

    public getUsers = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ['id', 'username', 'role']
        });

        res.send(users);
    };

    public getUserById = async (req: Request, res: Response) => {
        const id: number = req.params.id;

        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ['id', 'username', 'role']
            });

            res.status(200).send(user);
        } catch (error) {
            res.status(404).send('User not found');
        }
    };

    public createUser = async (req: Request, res: Response) => {
        let { username, password, role } = req.body;
        let user = new User();
        user.username = username;
        user.role = role;
        user.updatePassword(password);

        const errors = await validate(user);

        if (errors.length) {
            res.status(400).send(errors);
            return;
        }

        const userRepository = getRepository(User);

        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send('username already in use');
            return;
        }

        res.status(201).send('User created');
    };

}

export default new UserController();
