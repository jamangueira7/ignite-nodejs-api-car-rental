import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPlayLoad {
    sub: string;
}

export async function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error('Token missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, 'ce439be833f152d645c9f18d7a9030a7') as IPlayLoad;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if(!user) {
            throw new Error('user does not exists.');
        }

        next();
    } catch (err) {
        throw new Error('Invalid token!');
    }
}
