import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';


import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAuthenticated, ensureAdmin, createRentalController.handle);

export { rentalRoutes };
