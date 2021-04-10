import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

@Entity("users", {
    synchronize: false
})
class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column({ default: false })
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User };
