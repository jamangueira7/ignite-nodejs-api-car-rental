import dayjs from 'dayjs';
import { AppError } from '@shared/errors/AppError';

import { DevolutionRentalUseCase } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalUseCase';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CarsRepositoryInmemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInmemory';
import { DayjsDateProvider } from '@shared/container/providers/implementations/DayjsDateProvider';

let createRentalUseCase: DevolutionRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInmemory: CarsRepositoryInmemory;
let dayJsProvider: DayjsDateProvider;

describe('Create Rental', () => {

    const dayAdd24Hours = dayjs().add(1, 'day').toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsProvider = new DayjsDateProvider();
        carsRepositoryInmemory = new CarsRepositoryInmemory();
        createRentalUseCase = new DevolutionRentalUseCase(rentalsRepositoryInMemory, dayJsProvider, carsRepositoryInmemory);

    });

    it('should be able to create a new rental', async () => {

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is another open to the same user', async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });

            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental if there is another open to the same car', async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1111",
                expected_return_date: dayAdd24Hours,
            });

            const rental = await createRentalUseCase.execute({
                user_id: "32165",
                car_id: "1111",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental with invalid return time', async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1111",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})
