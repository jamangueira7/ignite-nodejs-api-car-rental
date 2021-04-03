import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { Category } from '../../model/Category';

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(file: any): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ImportCategoryUseCase };
