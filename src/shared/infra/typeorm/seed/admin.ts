import { hash } from 'bcryptjs';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

async function create() {
    const connection = getConnection();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, admin, created_at)
                VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, ${new Date()})
            `
    )
}

create().then(() => console.log('User admin created!'));
