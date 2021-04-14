import { AppError } from '../../../../errors/AppError';
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("should be able to authenticante an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: '00025',
            email: 'user@test.com',
            password: '1234',
            name: 'User test',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");

    });
});
