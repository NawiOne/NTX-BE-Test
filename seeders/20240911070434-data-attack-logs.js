'use strict';
const axios = require('axios')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const logs = await axios.get('https://livethreatmap.radware.com/api/map/attacks?limit=10');
    const payload = [];

    for (const log of logs.data) {
      for (const element of log) {

        const object = {
          sourceCountry: element.sourceCountry,
          destinationCountry: element.destinationCountry,
          millisecond: element.millisecond,
          type: element.type,
          weight: element.weight,
          attackTime: element.attackTime,
        }

        payload.push(object)

      }

    }

    return queryInterface.bulkInsert('attack_logs', payload)


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
