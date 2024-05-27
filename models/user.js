// models/user.js

const { DataTypes } = require('sequelize');
const { conn_price_tracker } = require('./index');

const User = conn_price_tracker.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING
  },

},{
  tableName: 'users',
  timestamps: false 
});

module.exports = User;
