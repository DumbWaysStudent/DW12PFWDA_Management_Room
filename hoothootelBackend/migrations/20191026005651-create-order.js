'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      is_booked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:true
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_end_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
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
    return queryInterface.dropTable('orders');
  }
};