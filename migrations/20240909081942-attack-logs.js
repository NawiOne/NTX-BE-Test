'use strict';

const fs = require('node:fs')
const path =  require('node:path')

module.exports = {
  async up (queryInterface, Sequelize) {
    const sql = fs.readFileSync(path.join(__dirname, '../files/attack_logs.sql'), 'utf8');
    return queryInterface.sequelize.query(sql);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
