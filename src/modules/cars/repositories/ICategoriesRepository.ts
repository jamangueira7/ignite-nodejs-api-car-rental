import { Category } from '../model/Category';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): void;
    list(): Category[];
    findbyName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };
