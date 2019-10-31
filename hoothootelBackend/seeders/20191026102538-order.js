'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [{
      room_id:1,
      customer_id:1,
      duration:5
    },
    {
      room_id:2,
      customer_id:2,
      duration:5
    },
    {
      room_id:3,
      customer_id:3,
      duration:5
    },
    {
      room_id:3,  
      customer_id:1,
      duration:5
    },
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
