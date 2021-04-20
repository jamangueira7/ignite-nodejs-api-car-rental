import { hash } from 'bcryptjs';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';

async function create() {
    const connection = await createConnection('localhost');

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
                VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXX', 'now()')
            `
    );

    await connection.close();
}

create().then(() => console.log('User admin created!'));
