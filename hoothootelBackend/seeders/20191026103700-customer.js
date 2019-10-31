'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [{
      name: 'John Doe',
      identity_number:'12345',
      phone_number:'0812345'
    },
    {
      name: 'John Fire',
      identity_number:'12345',
      phone_number:'0812345'
    },
    {
      name: 'John Connor',
      identity_number:'12345',
      phone_number:'0812345'
    },
    {
      name: 'John Takpor',
      identity_number:'12345',
      phone_number:'0812345'
    }], {});
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
