import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';


import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listAvailableCarsController = new ListAvailableCarsController();

rentalRoutes.post('/', ensureAuthenticated, ensureAdmin, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, ensureAdmin, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listAvailableCarsController.handle);

export { rentalRoutes };
