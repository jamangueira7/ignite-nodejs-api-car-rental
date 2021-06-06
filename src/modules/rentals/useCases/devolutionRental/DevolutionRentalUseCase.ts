import 'reflect-metadata'
import { AppError } from '@shared/errors/AppError';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvide/IDateProvider';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental>{

        const rental = await this.rentalsRepository.findById(id);
        console.log(rental)
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if(!rental) {
            throw new AppError("Rental does not exists!");
        }

        //Verificar o tempo do aluguel
        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        );

        if(daily <= 0 ) {
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if(delay > 0) {
            total = daily * car.fine_amount;
        }

        total += daily * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;

    }
}

export { DevolutionRentalUseCase };
