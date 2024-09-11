
const config = require("../app/config/db");
const { exec } = require('child_process');
const fs = require('node:fs');
const path = require('node:path');


exports.createDatabase = async (dbName) => {
    const db = this.dbTest('setup');
    const sequelizeInstance = db.sequelize;

    try {
        await sequelizeInstance.query(`DROP DATABASE IF EXISTS ${dbName}`);
        await sequelizeInstance.query(`CREATE DATABASE ${dbName}`);
    } catch (error) {
        throw new Error(error)
    }
}

exports.dropTestDatabase = async (dbName) => {
    const db = this.dbTest('setup');
    const sequelizeInstance = db.sequelize;
    try {
        await sequelizeInstance.query(`DROP DATABASE IF EXISTS ${dbName}`);
    } catch (error) {
        throw new Error(error);
    } finally {
        await sequelizeInstance.close();
    }
}

exports.dbTest = (env) => {
    const dbConfig = config[env];
    const Sequelize = require("sequelize");
    const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    });

    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    return db

}

exports.testMigrateDatabase = async () => {
    const db = this.dbTest('test');
    const attackLogFile = fs.readFileSync(path.join(__dirname, '../files/attack_logs.sql'), 'utf8');
    const surveiFile = fs.readFileSync(path.join(__dirname, '../files/survey.sql'), 'utf8');

    try {
        await db.sequelize.query(attackLogFile);
        await db.sequelize.query(surveiFile);
    } catch (error) {
        throw new Error(error);
    } finally {
        await db.sequelize.close();
    }

}
