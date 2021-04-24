import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ car_id, specification_id}: IRequest): Promise<void> {

        const carAlreadyExists = await this.carsRepository.findById(car_id);

        if(carAlreadyExists) {
            throw new AppError('Car already exists!');
        }

    }
}

export { CreateCarSpecificationUseCase };
