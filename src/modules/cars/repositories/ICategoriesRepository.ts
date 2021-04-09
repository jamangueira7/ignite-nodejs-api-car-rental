import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<Category[]>;
    findbyName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
