import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarDTO';

interface ICarsRepository {
    create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarsDTO): Promise<void>;
}

export { ICarsRepository };
