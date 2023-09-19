'use strict';

const { Votes } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Votes.bulkCreate([
      { userId: 5, postId: 21, upVote: 1 },
      { userId: 3, postId: 20, upVote: 1 },
      { userId: 1, postId: 1, upVote: 1 },
      { userId: 2, postId: 2, upVote: 1 },
      { userId: 3, postId: 3, upVote: 1 },
      { userId: 4, postId: 4, upVote: 1 },
      { userId: 5, postId: 5, upVote: 1 },
      { userId: 6, postId: 6, upVote: 1 },
      { userId: 7, postId: 7, upVote: 1 },
      { userId: 8, postId: 8, upVote: 1 },
      { userId: 9, postId: 9, upVote: 1 },
      { userId: 10, postId: 10, upVote: 1 },
      { userId: 11, postId: 11, upVote: 1 },
      { userId: 12, postId: 12, upVote: 1 },
      { userId: 13, postId: 13, upVote: 1 },
      { userId: 14, postId: 14, upVote: 1 },
      { userId: 15, postId: 15, upVote: 1 },
      { userId: 16, postId: 16, upVote: 1 },
      { userId: 17, postId: 17, upVote: 1 },
      { userId: 18, postId: 18, upVote: 1 },
      { userId: 19, postId: 19, upVote: 1 },
      { userId: 20, postId: 20, upVote: 1 },
      { userId: 21, postId: 21, upVote: 1 },
      { userId: 1, postId: 22, upVote: 1 },
      { userId: 2, postId: 23, upVote: 1 },
      { userId: 3, postId: 24, upVote: 1 },
      { userId: 4, postId: 25, upVote: 1 },
      { userId: 5, postId: 26, upVote: 1 },
      { userId: 6, postId: 27, upVote: 1 },
      { userId: 7, postId: 28, upVote: 1 },
      { userId: 8, postId: 29, upVote: 1 },
      { userId: 9, postId: 30, upVote: 1 },
      { userId: 10, postId: 31, upVote: 1 },
      { userId: 11, postId: 32, upVote: 1 },
      { userId: 12, postId: 33, upVote: 1 },
      { userId: 13, postId: 34, upVote: 1 },
      { userId: 14, postId: 35, upVote: 1 },
      { userId: 15, postId: 36, upVote: 1 },
      { userId: 16, postId: 37, upVote: 1 },
      { userId: 17, postId: 38, upVote: 1 },
      { userId: 18, postId: 39, upVote: 1 },
      { userId: 19, postId: 40, upVote: 1 },
      { userId: 20, postId: 41, upVote: 1 },
      { userId: 21, postId: 42, upVote: 1 },
      { userId: 1, postId: 43, upVote: 1 },
      { userId: 2, postId: 44, upVote: 1 },
      { userId: 3, postId: 45, upVote: 1 },
      { userId: 4, postId: 46, upVote: 1 },
      { userId: 5, postId: 47, upVote: 1 },
      { userId: 6, postId: 48, upVote: 1 },
      { userId: 7, postId: 49, upVote: 1 },
      { userId: 8, postId: 50, upVote: 1 },
      { userId: 21, postId: 29, upVote: 1 },
      { userId: 20, postId: 30, upVote: 1 },
      { userId: 19, postId: 31, upVote: 1 },
      { userId: 18, postId: 32, upVote: 1 },
      { userId: 17, postId: 33, upVote: 1 },
      { userId: 16, postId: 34, upVote: 1 },
      { userId: 15, postId: 35, upVote: 1 },
      { userId: 14, postId: 36, upVote: 1 },
      { userId: 13, postId: 37, upVote: 1 },
      { userId: 12, postId: 38, upVote: 1 },
      { userId: 11, postId: 39, upVote: 1 },
      { userId: 10, postId: 40, upVote: 1 },
      { userId: 9, postId: 41, upVote: 1 },
      { userId: 8, postId: 42, upVote: 1 },
      { userId: 20, postId: 32, upVote: 1 },
      { userId: 21, postId: 32, upVote: 1 },
      { userId: 11, postId: 29, upVote: 1 },
      { userId: 8, postId: 29, upVote: 1 },
      { userId: 19, postId: 32, upVote: 1 },

    ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Votes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
