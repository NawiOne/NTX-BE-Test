const request = require('supertest');
const app = require('../server');
const { setToken } = require('../app/utils/jwtTokens');
const { deleteRedis, getFromRedis } = require('../app/utils/redis')

const token = setToken({ role: 'USER' });


describe('ATTACK LOGS LIST', () => {
    it('should return 200, data attack logs with type source country', async () => {
        const requests = [];

        for (const log of logs) {
            const query = `
            INSERT 
                INTO attack_logs (
                "sourceCountry",
                "destinationCountry",
                "millisecond", 
                "type",
                "weight",
                "attackTime")
            VALUES (
                '${log.sourceCountry}',
                '${log.destinationCountry}',
                '${log.millisecond}',
                '${log.type}',
                '${log.weight}',
                '${log.attackTime}'
            )
        `
            const request = global.db.sequelize.query(query)
            requests.push(request)

        }

        await Promise.all(requests);
        await deleteRedis('sourceCountry');

        const expectedData = {
            "statusCode": 200,
            "success": true,
            "data": { "label": ["NL", "US"], "total": ["1", "2"] },
        }

        const expectedDataRedis = [
            { label: 'NL', total: '1' },
            { label: 'US', total: '2' }
        ]

        const response = await request(app)
            .get('/api/data/attack/logs?type=source')
            .set('Authorization', `Bearer ${token}`)

        const dataFromRedis = await getFromRedis('sourceCountry');
        await deleteRedis('sourceCountry')

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expectedData);
        expect(dataFromRedis).toStrictEqual(expectedDataRedis);
    })


    it('should return 422, query type is invalid', async () => {
        const query = 'other'
        const response = await request(app)
            .get(`/api/data/attack/logs?type=${query}`)
            .set('Authorization', `Bearer ${token}`)

        const expectedData = {
            "statusCode": 422,
            "message": `Error: "type" must be one of [source, destination]`,
            "success": false
        }

        expect(response.status).toBe(422);
        expect(response.body).toStrictEqual(expectedData);
    })

    it('should return 422, query type is required', async () => {
        const response = await request(app)
            .get(`/api/data/attack/logs`)
            .set('Authorization', `Bearer ${token}`)

        const expectedData = {
            "statusCode": 422,
            "message": `Error: "type" is required`,
            "success": false
        }

        expect(response.status).toBe(422);
        expect(response.body).toStrictEqual(expectedData);
    })

    it('should return 401, Unauthorized', async () => {
        const response = await request(app)
            .get('/api/data/attack/logs?type=source')

        const expectedData = {
            statusCode: 401,
            message: 'Authentication problem. A token is required for authentication',
            success: false
        }

        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual(expectedData);
    })
})


const logs = [{
    "sourceCountry": "NL",
    "destinationCountry": "US",
    "millisecond": 326,
    "type": "botnets",
    "weight": "Light",
    "attackTime": "2024-09-11T15:13:23.3266667"
},
{
    "sourceCountry": "US",
    "destinationCountry": "AU",
    "millisecond": 390,
    "type": "botnets",
    "weight": "Light",
    "attackTime": "2024-09-11T15:13:23.39"
},
{
    "sourceCountry": "US",
    "destinationCountry": "US",
    "millisecond": 510,
    "type": "botnets",
    "weight": "Light",
    "attackTime": "2024-09-11T15:13:23.51"
},]