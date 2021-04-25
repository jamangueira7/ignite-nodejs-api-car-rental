import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';
import { CarsRepositoryInmemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInmemory';
import { SpecificationRepositoryInmemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInmemory';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInmemory: CarsRepositoryInmemory;
let specificationRepositoryInmemory: SpecificationRepositoryInmemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInmemory = new CarsRepositoryInmemory();
        specificationRepositoryInmemory = new SpecificationRepositoryInmemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInmemory,
            specificationRepositoryInmemory,
        );
    });

    it("should be able to add a new specification to a now-existent car", async () => {
        expect(async () => {
            const car_id = "123456";
            const specification_id = ["654321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specification_id,
            });

        }).rejects.toBeInstanceOf(AppError);
    });

   it("should be able to add a new specification to the car", async () => {
       const car = await carsRepositoryInmemory.create({
           name: "Name Car",
           description: "Description Car",
           daily_rate: 100,
           license_plate: "ACB-1234",
           fine_amount: 60,
           brand: "Brand",
           category_id: "category",
       });

       const specification = await specificationRepositoryInmemory.create({
          description: 'test descricao',
          name: 'test name',
       });

       const specification_id = [specification.id];

       const specificationsCar = await createCarSpecificationUseCase.execute({
           car_id: car.id,
           specification_id,
       });

       expect(specificationsCar).toHaveProperty('specifications');
       expect(specificationsCar.specifications.length).toBe(1);
   });
});
