const dotenv = require("dotenv");
dotenv.config();

const randomName = `test_db_${Math.floor(Math.random() * 10_001)}`;

module.exports = {
  setup: {
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: 'postgres',
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: randomName,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  development: {
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
