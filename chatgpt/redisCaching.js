const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');
const { promisify } = require('util');

const app = express();

// PostgreSQL connection setup
const pool = new Pool({
  user: 'your-username',
  host: 'localhost',
  database: 'your-database',
  password: 'your-password',
  port: 5432,
});

// Redis connection setup
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// TTL for cache in seconds (e.g., 180 seconds = 3 minutes)
const CACHE_TTL = 180;

// Endpoint to get counts of distinct source and destination countries
app.get('/getData', async (req, res) => {
  try {
    // Check if the data is already in the Redis cache
    const cachedData = await getAsync('attackData');
    
    if (cachedData) {
      // If cached data is found, return it
      console.log('Returning cached data');
      return res.json(JSON.parse(cachedData));
    }

    // If no cache found, query the database
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT sourceCountry) AS sourceCount,
        COUNT(DISTINCT destinationCountry) AS destinationCount
      FROM attacks
    `);

    const { sourcecount, destinationcount } = result.rows[0];
    const responseData = {
      sourceCountryCount: sourcecount,
      destinationCountryCount: destinationcount,
    };

    // Store the result in Redis with an expiration time (TTL)
    await setAsync('attackData', JSON.stringify(responseData), 'EX', CACHE_TTL);

    // Return the data to the client
    res.json(responseData);

  } catch (err) {
    console.error('Error executing query or caching:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
