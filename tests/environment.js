const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const { dbTest } = require('./db.setup');
const config = require('../app/config/db');
const {
    createDatabase,
    dropTestDatabase,
    testMigrateDatabase
} = require('./db.setup');


class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();

        this.db = dbTest('test');
        this.global.dbName = config['test'].database;
        this.global.db = this.db;

        console.info(`[ENV] creating db ${this.global.dbName}`);
        await createDatabase(this.global.dbName);
        await testMigrateDatabase();

    }

    async teardown() {
        await this.db.sequelize.close();
        console.info(`[ENV] droping db ${this.global.dbName}`);

        await dropTestDatabase(this.global.dbName);

        await super.teardown();

    }
}


module.exports = CustomEnvironment
