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
          communityId: 4,
          status: "Unapproved"
        },
        {
          userId: 1,
          communityId: 5
        },
        {
          userId: 1,
          communityId: 6,
          status: "Unapproved"
        },
        {
          userId: 1,
          communityId: 7,
          status: "Unapproved"
        },
        {
          userId: 1,
          communityId: 8,
          status: "Unapproved"
        },
        {
          userId: 2,
          communityId: 4
        },
        {
          userId: 2,
          communityId: 5,
          status: "Unapproved"
        },
        {
          userId: 2,
          communityId: 6,
          status: "Unapproved"
        },
        {
          userId: 2,
          communityId: 7,
          status: "Unapproved"
        },
        {
          userId: 2,
          communityId: 8,
          status: "Unapproved"
        },
        {
          userId: 3,
          communityId: 4,
          status: "Unapproved"
        },
        {
          userId: 3,
          communityId: 5,
          status: "Unapproved"
        },
        {
          userId: 3,
          communityId: 6,
          status: "Unapproved"
        },
        {
          userId: 3,
          communityId: 7,
          status: "Unapproved"
        },
        {
          userId: 3,
          communityId: 8,
        },
        {
          userId: 4,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 4,
          communityId: 4,
          status: "Unapproved"
        },
        {
          userId: 4,
          communityId: 5,
          status: "Unapproved"
        },
        {
          userId: 4,
          communityId: 6,
          status: "Unapproved"
        },
        {
          userId: 4,
          communityId: 7,
          status: "Unapproved"
        },
        {
          userId: 4,
          communityId: 8,
          status: "Unapproved"
        },
        {
          userId: 1,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 2,
          communityId: 10,
          status: "Unapproved"

        },
        {
          userId: 3,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 1,
          communityId: 1,
          status: "Unapproved"
        },
        {
          userId: 2,
          communityId: 2,
          status: "Unapproved"
        },
        {
          userId: 4,
          communityId: 9,
          status: "Unapproved"
        },
        {
          userId: 13,
          communityId: 6,
        },
        {
          userId: 17,
          communityId: 7,
        },
        {
          userId: 5,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 6,
          communityId: 10,
          status: "Unapproved"

        },
        {
          userId: 7,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 8,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 9,
          communityId: 10,
          status: "Unapproved"

        },
        {
          userId: 10,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 11,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 12,
          communityId: 10,
          status: "Unapproved"

        },
        {
          userId: 13,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 14,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 15,
          communityId: 10,
          status: "Unapproved"

        },
        {
          userId: 16,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 17,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 18,
          communityId: 10,
          status: "Unapproved"

        },
        {
          userId: 19,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 21,
          communityId: 10,
          status: "Unapproved"
        },
        {
          userId: 20,
          communityId: 10,
          status: "Unapproved"
        },
      ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CommunityMembers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})

  }
};
