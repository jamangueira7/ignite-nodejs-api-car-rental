import { Router } from 'express';

import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';


import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const rentalRoutes = Router();

const createRentalController = new DevolutionRentalController();

rentalRoutes.post('/', ensureAuthenticated, ensureAdmin, createRentalController.handle);

export { rentalRoutes };
