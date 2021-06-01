import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
    create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarsDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
    findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]>
    updateAvailable(id: string, available: boolean): Promise<void>
}

export { ICarsRepository };
