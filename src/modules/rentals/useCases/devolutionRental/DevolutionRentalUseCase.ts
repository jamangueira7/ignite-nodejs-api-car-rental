import 'reflect-metadata'
import { AppError } from '@shared/errors/AppError';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvide/IDateProvider';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    id: string;
    car_id: string;
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

    async execute({ id, car_id }: IRequest): Promise<Rental>{

        const rental = await this.rentalsRepository.findById(id);

        if(!rental) {
            throw new AppError("Rental does not exists!");
        }

        //Verificar o tempo do aluguel
    }
}

export { DevolutionRentalUseCase };
