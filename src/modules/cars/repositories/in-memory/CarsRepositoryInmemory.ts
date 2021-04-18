import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

class CarsRepositoryInmemory implements ICarsRepository {

    cars: Category[] = [];

    async create({name, description}: ICreateCarsDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.cars.push(category);
    }
}

export { CarsRepositoryInmemory };
