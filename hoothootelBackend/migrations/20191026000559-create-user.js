'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identity_number: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '12345'
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0812345'
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://vignette.wikia.nocookie.net/spongebob/images/f/f2/Oldbash.jpg/revision/latest?cb=20170724203516'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};