'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await User.bulkCreate([
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: "Demo",
          lastName: "Lition"
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password2'),
          firstName: "Fake",
          lastName: "User1"

        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password3'),
          firstName: "Fake",
          lastName: "User2"
        },
        {
          email: 'thandimpofu2003@gmail.com',
          username: 'thandi14',
          hashedPassword: bcrypt.hashSync('Love2003'),
          firstName: "Thandi",
          lastName: "Mpofu"
        },
        {
          email: 'user3@user.io',
          username: 'StarGazer42',
          hashedPassword: bcrypt.hashSync('password4'),
          firstName: "Fake",
          lastName: "User3"
        },
        {
          email: 'user4@user.io',
          username: 'PixelNinja',
          hashedPassword: bcrypt.hashSync('password5'),
          firstName: "Fake",
          lastName: "User4"
        },
        {
          email: 'user5@user.io',
          username: 'MidnightRider',
          hashedPassword: bcrypt.hashSync('password6'),
          firstName: "Fake",
          lastName: "User5"
        },
        {
          email: 'user7@user.io',
          username: 'RainbowDreamer',
          hashedPassword: bcrypt.hashSync('password7'),
          firstName: "Fake",
          lastName: "User7"
        },
        {
          email: 'user8@user.io',
          username: 'TechGeek123',
          hashedPassword: bcrypt.hashSync('password8'),
          firstName: "Fake",
          lastName: "User8"
        },
        {
          email: 'user9@user.io',
          username: 'CoffeeLover88',
          hashedPassword: bcrypt.hashSync('password9'),
          firstName: "Fake",
          lastName: "User9"
        },
        {
          email: 'user10@user.io',
          username: 'MusicMaven21',
          hashedPassword: bcrypt.hashSync('password10'),
          firstName: "Fake",
          lastName: "User10"
        },
        {
          email: 'user11@user.io',
          username: 'AdventureSeeker',
          hashedPassword: bcrypt.hashSync('password11'),
          firstName: "Fake",
          lastName: "User11"
        },
        {
          email: 'user12@user.io',
          username: 'NatureExplorer',
          hashedPassword: bcrypt.hashSync('password12'),
          firstName: "Fake",
          lastName: "User9"
        },
        {
          email: 'user130@user.io',
          username: 'FitnessFreak77',
          hashedPassword: bcrypt.hashSync('password13'),
          firstName: "Fake",
          lastName: "User13"
        },
        {
          email: 'user14@user.io',
          username: 'GreatExplorer',
          hashedPassword: bcrypt.hashSync('password14'),
          firstName: "Fake",
          lastName: "User14"
        },
        {
          email: 'user15@user.io',
          username: 'FreakyFreak23',
          hashedPassword: bcrypt.hashSync('password15'),
          firstName: "Fake",
          lastName: "User15"
        },
        {
          email: 'user16@user.io',
          username: 'Bookworm22',
          hashedPassword: bcrypt.hashSync('password16'),
          firstName: "Fake",
          lastName: "User16"
        },
        {
          email: 'user17@user.io',
          username: 'SkyDiver99',
          hashedPassword: bcrypt.hashSync('password17'),
          firstName: "Fake",
          lastName: "User17"
        },
        {
          email: 'user18@user.io',
          username: 'BeachBum44',
          hashedPassword: bcrypt.hashSync('password18'),
          firstName: "Fake",
          lastName: "User18"
        },
        {
          email: 'user19@user.io',
          username: 'GamerGirl55',
          hashedPassword: bcrypt.hashSync('password19'),
          firstName: "Fake",
          lastName: "User19"
        },
        {
          email: 'user20@user.io',
          username: 'ArtisticSoul',
          hashedPassword: bcrypt.hashSync('password20'),
          firstName: "Fake",
          lastName: "User20"
        }


      ], { validate: true })

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
