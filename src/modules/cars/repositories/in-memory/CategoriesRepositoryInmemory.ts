import { ICategoriesRepository, ICreateCategoryDTO } from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

class CategoriesRepositoryInmemory implements ICategoriesRepository {

    categories: Category[] = [];

    async create({name, description}: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.categories.push(category);
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.categories.find((category) => category.name === name);

        return category;
    }

    async list(): Promise<Category[]> {
        const all = this.categories;

        return all;
    }
}

export { CategoriesRepositoryInmemory };
