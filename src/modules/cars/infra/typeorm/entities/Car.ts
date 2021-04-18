import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity("cars", {
    synchronize: false
})
class Car {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    category_id: string;

    @Column()
    brand: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export { Car };
