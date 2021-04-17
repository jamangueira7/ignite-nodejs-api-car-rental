import { AppError } from '@shared/errors/AppError';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';
import { CategoriesRepositoryInmemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInmemory';

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoriesRepositoryInmemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoryRepositoryInMemory = new CategoriesRepositoryInmemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);
    });

   it("should be able to create a new category", async () => {
       const category = {
           name: 'Category test',
           description: 'Category description',
       };

       await createCategoryUseCase.execute({
           name: category.name,
           description: category.description,
       });

       const result = await categoryRepositoryInMemory.findByName(category.name);

       expect(result).toHaveProperty("id");

   });

    it("should not be able to create a new category with name exist", async () => {

        expect(async () => {
            const category = {
                name: 'Category test',
                description: 'Category description',
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError)

    });
});
