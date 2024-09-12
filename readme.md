## Built With
* [Node.js][Nodejs-url]
* [ExpressJs][Express-url]
* [PostgreSQL][Postgresql-url]
* [Sequelize][Sequelize-url]
* [Websocket][Ws-url]
* [Redis][Redis-url]


## Getting Started



## ChatGPT-generated files
**You can them in ***chatgpt*** folder**



### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/NawiOne/NTX-BE-Test.git
   ```
2. Switch to the repo folder
   ```sh
   cd NTX-BE-Test
   ```
3. Install NPM packages
   ```sh
   npm install
   npm install nodemon
   ```
4. Enter your Key in `.env`
   ```js
   HOST=
   USER=
   PASSWORD=
   DB=
   JWT_SECRET_KEY=
   REDIS_URL=
   ```
5. Migrate database<br>
   you can migrate database using 
   ```sh
    npm run migrate
    ```

6. Seed data attack logs<br>
   ```sh
    npm run seed
    ```
  
7. Run the application<br>
   ```sh
    npm start
    ```

8. If you want to run test<br>
   ```sh
    npm test
    ```
    or with the specific test file
   ```sh
    npm test -- tests/survey.create.test.js
   ```

## Endpoint List
**BASE URL -> http://localhost:7878**


***Login Simulation***<br>
this endpoint return token in response

 * POST -> /api/data/token/simulation<br>
 ``payload``
   ```sh
        ADMIN/CUSTOMER
         {
            "role": "ADMIN" 
         }
   ```
 <br>

***Get Data Surveys***<br>
 * GET -> /api/data/survey<br>
 <br>

***Post Data Survey***<br>

 * POST -> /api/data/survey<br>
 ``payload``
   ```sh
         {
            "userId": 1,
            "values": [1,2,3,4]
         }
   ```
   <br>


***View Data From Websocket***<br>

 * GET -> /api/data/view<br>
 <br>


***Get Data Attack Logs***<br>

 * GET -> /api/data/attack/logs?type=source<br>
 ``query param``
   ```sh
    type = source/destination
   ```
   <br>












[Nodejs-url]:https://nodejs.org/en
[Express-url]: https://expressjs.com/
[Postgresql-url]: https://www.postgresql.org/
[Sequelize-url]: https://sequelize.org/
[Ws-url]: https://www.npmjs.com/package/ws
[Redis-url]: https://redis.io/docs/latest/
