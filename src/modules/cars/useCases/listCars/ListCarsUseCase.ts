import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

@injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute(): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable();

        return cars;
    }
}

export { ListCarsUseCase };
