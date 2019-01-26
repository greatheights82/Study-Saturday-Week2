'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('tests', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Student.hasMany(Test);
Test.belongsTo(Student, { as: 'student' });

module.exports = Test;
