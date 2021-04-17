import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from '@modules/accounts/useCase/createUser/CreateUserUseCase';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { AuthenticateUserUseCase } from '@modules/accounts/useCase/authenticateUser/AuthenticateUserUseCase';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

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

    it("should not be able to authenticante a none existing user", async () => {
        expect(async () => {
            const result = await authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticante with incorrect password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '00025',
                email: 'user2@test.com',
                password: '1234',
                name: 'User test',
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: '4321',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
