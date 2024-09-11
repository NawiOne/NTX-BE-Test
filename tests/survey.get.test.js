const request = require('supertest');
const app = require('../server');
const { setToken } = require('../app/utils/jwtTokens');

const token = setToken({ role: 'CUSTOMER' })


describe('SURVEY LIST', () => {
    it('should return 200, data list survey', async () => {
        const response = await request(app)
            .get('/api/data/survey')
            .set('Authorization', `Bearer ${token}`);

        const expectedData = {
            "statusCode": 200,
            "success": true,
            "data": [
                27,
                28,
                27,
                25,
                27,
                0,
                0,
                0,
                0,
                0
            ]

        }

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expectedData);
    })

    it('should return 401, Unauthorized', async () => {
        const response = await request(app)
            .get('/api/data/survey')

        const expectedData = {
            statusCode: 401,
            message: 'Authentication problem. A token is required for authentication',
            success: false
        }

        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual(expectedData);
    })
})