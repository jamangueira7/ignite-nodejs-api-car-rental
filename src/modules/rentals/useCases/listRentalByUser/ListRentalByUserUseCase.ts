import 'reflect-metadata';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { inject, injectable } from 'tsyringe';


@injectable()
class ListRentalByUserUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
    ) {}

    async execute( user_id: string): Promise<Rental[]>{

        const rentalByUser = await this.rentalsRepository.findByUser(user_id);

        return rentalByUser;
    }
}

export { ListRentalByUserUseCase };
