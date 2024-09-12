const request = require('supertest');
const app = require('../server');
const { setToken } = require('../app/utils/jwtTokens');


describe('SURVEY INSERT', () => {
    it('should return 200, insert survey successfully', async () => {
        const token = setToken({ role: 'ADMIN' });

        const payload = {
            "userId": 1,
            "values": [1, 2, 3, 4]
        }

        const response = await request(app)
            .post('/api/data/survey')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)

        const expectedData = {
            statusCode: 200,
            message: 'Survey sent successfully!',
            success: true,
            data: payload
        }

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expectedData);
    })

    it('should return 404, user id not found', async () => {
        const token = setToken({ role: 'ADMIN' });

        const payload = {
            "userId": 111,
            "values": [1, 2, 3, 4]
        }

        const response = await request(app)
            .post('/api/data/survey')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)

        const expectedData = {
            statusCode: 404,
            message: 'User not found',
            success: false
        }

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual(expectedData);
    })

    it('should return 422, payload values is required', async () => {
        const token = setToken({ role: 'ADMIN' });

        const payload = {
            "userId": 1
        }

        const response = await request(app)
            .post('/api/data/survey')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)

        const expectedData = {
            "statusCode": 422,
            "message": `Error: "values" is required`,
            "success": false
        }

        expect(response.status).toBe(422);
        expect(response.body).toStrictEqual(expectedData);
    })

    it('should return 403, dont have permission', async () => {
        const token = setToken({ role: 'USER' });

        const payload = {
            "userId": 1,
            "values": [1, 2, 3, 4]
        }

        const response = await request(app)
            .post('/api/data/survey')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)

        const expectedData = {
            statusCode: 403,
            message: "Authentication problem. You don't have permission.",
            success: false
        }

        expect(response.status).toBe(403);
        expect(response.body).toStrictEqual(expectedData);
    })


    it('should return 401, Unauthorized', async () => {
        const response = await request(app)
            .post('/api/data/survey')

        const expectedData = {
            statusCode: 401,
            message: 'Authentication problem. A token is required for authentication',
            success: false
        }

        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual(expectedData);
    })
})