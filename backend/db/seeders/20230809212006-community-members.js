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
          communityId: 1
        },
        {
          userId: 1,
          communityId: 2
        },
        {
          userId: 1,
          communityId: 3
        },
        {
          userId: 1,
          communityId: 4
        },
        {
          userId: 1,
          communityId: 5
        },
        {
          userId: 2,
          communityId: 1
        },
        {
          userId: 2,
          communityId: 2
        },
        {
          userId: 2,
          communityId: 3
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
          userId: 3,
          communityId: 1
        },
        {
          userId: 3,
          communityId: 2
        },
        {
          userId: 3,
          communityId: 3
        },
        {
          userId: 3,
          communityId: 4
        },
        {
          userId: 3,
          communityId: 5
        }
      ], { validate: true })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CommunityMembers', null, {});

  }
};
