import { AppError } from '@shared/errors/AppError';
import { ListCarsUseCase } from '@modules/cars/useCases/listCars/ListCarsUseCase';
import { CarsRepositoryInmemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInmemory';

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInmemory: CarsRepositoryInmemory;

describe("List Car", () => {

    beforeEach(() => {
        carsRepositoryInmemory = new CarsRepositoryInmemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInmemory);
    });

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInmemory.create({
            name: "Name Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ACB-1234",
            fine_amount: 60,
            brand: "Brand Car",
            category_id: "category",
        });
        const cars = await listCarsUseCase.execute();

        expect(cars).toEqual(car);
    });
});
