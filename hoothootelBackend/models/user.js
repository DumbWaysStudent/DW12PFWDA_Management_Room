'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING(50),
    password: DataTypes.STRING,
    identity_number: DataTypes.INTEGER,
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING(500)
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};