import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe("Create Category Controller", async () => {
    it("Test", async () => {
        await request(app);
    });

});
