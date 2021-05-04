import { Repository, getRepository } from 'typeorm';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

class CarsImageRepository implements ICarsImageRepository{

    private repository: Repository<CarImage>

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(
             car_id,
             image_name,
    ): Promise<CarImage> {

        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }
}

export { CarsImageRepository };
