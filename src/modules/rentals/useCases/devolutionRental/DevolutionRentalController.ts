import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalUseCase';

class DevolutionRentalController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;

        const createRentalUseCase = container.resolve(DevolutionRentalUseCase);

        const rental = await createRentalUseCase.execute({
           car_id,
           user_id: id,
           expected_return_date,
        });

        return response.status(201).json(rental);
    }
}

export { DevolutionRentalController };
