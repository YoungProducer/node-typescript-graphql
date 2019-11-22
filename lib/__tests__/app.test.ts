import * as supertest from 'supertest';
import {} from 'jest';
import { expect, should } from 'chai';
import * as http from 'http';

// Custom imports
import app from '../app';
import { DataBaseController } from '../utils/dataBaseController';

process.env.TEST_SUITE = 'users';

describe('GET /auth', () => {
    let server: http.Server;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll(done => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
    });

    afterAll(done => {
        server.close(done);
    });

    it('GET /signin', async done => {
        // Get response from /auth/signin
        const response = await request.post('/auth/signin').send({
            userName: 'dine',
            password: 'as',
        });
        // Chech property
        expect(response.body).to.have.property('userName');
        done();
    });
});
