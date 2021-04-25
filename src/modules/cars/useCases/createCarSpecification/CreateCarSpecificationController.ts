import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';

class CreateCarSpecificationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, specification_id } = request.query;

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const car = await createCarSpecificationUseCase.execute({
            car_id,
            specification_id,
        });

        return response.status(201).json(car);
    }
}

export { CreateCarSpecificationController };
