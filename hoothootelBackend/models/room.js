'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING,
  }, {});
  room.associate = function(models) {
    room.hasMany(models.order, {
      as:'order',
      foreignKey: 'room_id'
    })
    // associations can be defined here
  };
  return room;
};