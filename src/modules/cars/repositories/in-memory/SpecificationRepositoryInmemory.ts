import { ICreateSpecificationDTO, ISpecificationsRepository} from '@modules/cars/repositories/ISpecificationsRepository';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

class SpecificationRepositoryInmemory implements ISpecificationsRepository {

    specifications: Specification[] = [];

    async create({name, description }: ICreateSpecificationDTO): Promise<Specification> {

        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return await this.specifications.find((specification) => specification.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const all = this.specifications.filter((specification) => ids.includes(specification.id));

        return all;
    }
}

export { SpecificationRepositoryInmemory };
