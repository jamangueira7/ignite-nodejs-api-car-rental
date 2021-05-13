import request from 'supertest';
import { Connection } from 'typeorm';

import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        console.log("1#############")
        await connection.runMigrations();
        console.log("2#############")

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



    it("should be able to create a new category", async () => {
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

        expect(response.status).toBe(201)
    });

    it("should be able to create a new category with name exists", async () => {
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

        expect(response.status).toBe(400)
    });

});
