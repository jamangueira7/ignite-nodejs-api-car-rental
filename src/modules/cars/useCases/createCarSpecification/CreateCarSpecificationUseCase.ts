import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
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
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specification_id }: IRequest): Promise<Car> {

        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists) {
            throw new AppError('Car already exists!');
        }

        const specifications = await this.specificationsRepository.findByIds(
            specification_id
        );

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists);

        return carExists;

    }
}

export { CreateCarSpecificationUseCase };
