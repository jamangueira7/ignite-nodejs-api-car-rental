import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {

        images_name.map(async image => {
            await this.carsImageRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
