'use strict';

const { CommunityMembers } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await CommunityMembers.bulkCreate([
        {
          userId: 1,
          communityId: 4
        },
        {
          userId: 1,
          communityId: 5
        },
        {
          userId: 1,
          communityId: 6
        },
        {
          userId: 1,
          communityId: 7
        },
        {
          userId: 1,
          communityId: 8
        },
        {
          userId: 2,
          communityId: 4
        },
        {
          userId: 2,
          communityId: 5
        },
        {
          userId: 2,
          communityId: 6
        },
        {
          userId: 2,
          communityId: 7
        },
        {
          userId: 2,
          communityId: 8
        },
        {
          userId: 3,
          communityId: 4
        },
        {
          userId: 3,
          communityId: 5
        },
        {
          userId: 3,
          communityId: 6
        },
        {
          userId: 3,
          communityId: 7
        },
        {
          userId: 3,
          communityId: 8
        }
      ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CommunityMembers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})

  }
};
