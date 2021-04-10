import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { IUsersRepository } from '../../repositories/IUsersRepository';


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new Error('Email or password incorrect.');
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error('Email or password incorrect.');
        }

        //chave - palmeiras não tem mundial
        const token = sign(
            {},
            'ce439be833f152d645c9f18d7a9030a7',
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token
        };

    }
}

export { AuthenticateUserUseCase };
