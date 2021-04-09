import {Category} from "../entities/Category";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findbyName(name: string): Promise<Category>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
