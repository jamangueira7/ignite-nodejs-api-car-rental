import {Category} from "../model/Category";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): void;
    findbyName(name: string): Category;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
