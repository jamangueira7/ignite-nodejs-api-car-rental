import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';
import { CarsRepositoryInmemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInmemory';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInmemory: CarsRepositoryInmemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInmemory = new CarsRepositoryInmemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInmemory);
    });

    it("should be able to add a new specification to a now-existent car", async () => {
        expect(async () => {
            const car_id = "123456";
            const specification_id = ["654321"];
            await createCarSpecificationUseCase.execute({ car_id, specification_id});

        }).rejects.toBeInstanceOf(AppError);
    });

   it("should be able to add a new specification to the car", async () => {
       const car = await createCarUseCase.execute({
           name: "Name Car",
           description: "Description Car",
           daily_rate: 100,
           license_plate: "ACB-1234",
           fine_amount: 60,
           brand: "Brand",
           category_id: "category",
       });

       const specification_id = ["654321"];

       const car = await createCarSpecificationUseCase.execute({
           car_id: car.id,
           specification_id,
       });

       expect(car).toHaveProperty('id');
   });
});
