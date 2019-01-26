'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define(
  'student',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: (students, options) => {
        students.firstName =
          students.firstName.charAt(0).toUpperCase() +
          students.firstName.slice(1);
        students.lastName =
          students.lastName.charAt(0).toUpperCase() +
          students.lastName.slice(1);
      },
    },
  }
);

module.exports = Student;
