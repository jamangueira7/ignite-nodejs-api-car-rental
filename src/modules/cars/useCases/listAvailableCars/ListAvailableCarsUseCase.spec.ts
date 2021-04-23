import { AppError } from '@shared/errors/AppError';
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';
import { CarsRepositoryInmemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInmemory';

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInmemory: CarsRepositoryInmemory;

describe("List Car", () => {

    beforeEach(() => {
        carsRepositoryInmemory = new CarsRepositoryInmemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInmemory);
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
        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {

        const car = await carsRepositoryInmemory.create({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ACB-4554",
            fine_amount: 60,
            brand: "Brand Car2",
            category_id: "category",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Brand Car2"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInmemory.create({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ACB-4554",
            fine_amount: 60,
            brand: "Brand Car2",
            category_id: "category",
        });

        const cars = await listCarsUseCase.execute({
            name: "Name Car2"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {

        const car = await carsRepositoryInmemory.create({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ACB-4554",
            fine_amount: 60,
            brand: "Brand Car2",
            category_id: "12345",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);
    });
});
