import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';

class CreateRentalController {

    async handle(request: Request, response: Response) {

        const createRentalUseCase = container.resolve(CreateRentalUseCase);
    }
}

export { CreateRentalController };
