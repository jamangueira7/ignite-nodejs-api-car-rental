import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository, ICreateSpecificationDTO } from '../ISpecificationsRepository';


class SpecificationsRepository implements ISpecificationsRepository{
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({ name, description }: ICreateSpecificationDTO ): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });

        this.specifications.push(specification);
    }


    findbyName(name: string): Specification {
        const specification = this.specifications.find((category) => category.name === name);

        return specification;
    }
}

export { SpecificationsRepository };
