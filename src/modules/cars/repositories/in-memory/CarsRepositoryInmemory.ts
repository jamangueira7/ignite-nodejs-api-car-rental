import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

class CarsRepositoryInmemory implements ICarsRepository {

    cars: Car[] = [];

    async create({
         name,
         description,
         daily_rate,
         license_plate,
         fine_amount,
         brand,
         category_id,
    }: ICreateCarsDTO): Promise<Car> {

        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const all = this.cars
            .filter((car) => {
                if(car.available === true ||
                    ((brand && car.brand === brand)
                    || (category_id && car.brand === category_id)
                    || (name && car.name === name))
                ){
                    return car;
                }
                return null;
            });

        return all;
    }

    async findById(id: string): Promise<Car> {
        return await this.cars.find((car) => car.id === id);
    }
}

export { CarsRepositoryInmemory };
