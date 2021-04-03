import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepository.findbyName(name);

        if(categoryAlreadyExists) {
            throw new Error('Category already exists!');
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
