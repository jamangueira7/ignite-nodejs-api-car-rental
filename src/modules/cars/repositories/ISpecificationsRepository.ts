import { Category } from '../model/Category';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateCategoryDTO): void;
    list(): Category[];
    findbyName(name: string): Category;
}

export { ISpecificationsRepository, ICreateCategoryDTO };
