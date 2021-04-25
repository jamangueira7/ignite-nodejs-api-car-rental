import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';
import { CarsRepositoryInmemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInmemory';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInmemory: CarsRepositoryInmemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInmemory = new CarsRepositoryInmemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInmemory);
    });

   it("should be able to create a new car", async () => {

       const car = await createCarUseCase.execute({
           name: "Name Car",
           description: "Description Car",
           daily_rate: 100,
           license_plate: "ACB-1234",
           fine_amount: 60,
           brand: "Brand",
           category_id: "category",
       });

       expect(car).toHaveProperty('id');
   });

    it("should not be able to create a new car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car1",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ACB-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Name Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ACB-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("should be able to create a new car with available try by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ACB-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);

    });
});
