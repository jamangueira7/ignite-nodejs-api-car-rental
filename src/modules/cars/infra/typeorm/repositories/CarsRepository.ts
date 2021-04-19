import { Repository, getRepository } from 'typeorm';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarDTO';

class CarsRepository implements ICarsRepository{

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarsDTO ): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });

        return car;
    }
}

export { CarsRepository };
