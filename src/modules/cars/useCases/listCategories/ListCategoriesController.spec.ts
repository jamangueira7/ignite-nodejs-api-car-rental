import request from 'supertest';
import { Connection } from 'typeorm';

import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe("List Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
                VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXX', 'now()')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });



    it("should be able to list all categories", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: 'admin@rentx.com.br',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest name",
                description: "Category Supertest description",
            })
            .set({
                Authorization: `Bearer ${token}`
            });

        const res = await request(app).get("/categories");

        expect(res.status).toBe(201);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0].name).toEqual("Category Supertest name");
    });

});
