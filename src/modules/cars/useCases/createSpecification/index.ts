import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateSpecificationController } from './CreateSpecificationController';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateSpecificationUseCase(categoriesRepository);

const createCategoryController = new CreateSpecificationController(createCategoryUseCase);

export { createCategoryController }
