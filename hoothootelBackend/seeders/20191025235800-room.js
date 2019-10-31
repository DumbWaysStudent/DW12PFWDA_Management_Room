'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("rooms", [{
      name: '101',
    },
    {
      name: '102',
    },
    {
      name: '103',
    },
    {
      name: '201',
    },
    {
      name: '202',
    },
    {
      name: '203',
    },
    {
      name: '301',
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
