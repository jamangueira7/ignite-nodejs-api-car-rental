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
       const category = {
           name: 'Category test',
           description: 'Category description',
       };

       await createCarUseCase.execute({
           name: "Name Car",
           description: "Description Car",
           daily_rate: 100,
           license_plate: "ACB-1234",
           fine_amount: 60,
           brand: "Brand",
           category_id: "category",
       });


       expect('').toHaveProperty("id");

   });
});
