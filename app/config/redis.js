const { createClient } = require('redis');
const dotenv = require("dotenv");

dotenv.config();

const connectRedis = async () => {
    const client = createClient({
        url: process.env.REDIS_URL
    })

    client.on('error', err => console.log('Redis Client Error', err))

    await client.connect()

    return client


}

const redis = connectRedis();

module.exports = redis

