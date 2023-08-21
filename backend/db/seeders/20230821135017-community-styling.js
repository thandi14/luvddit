'use strict';

const { communityStyles } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await communityStyles.bulkCreate([
      {
        communityId: 8,
        profile: "https://e0.pxfuel.com/wallpapers/295/904/desktop-wallpaper-cute-anime-dogs-cute-cartoon-dogs.jpg",
        header: "https://i.pinimg.com/originals/1c/ee/26/1cee26383ae282b179ec4ee097fa9d19.jpg"
      },
      {
        communityId: 5,
        profile: "https://i.pinimg.com/736x/7a/82/00/7a82006cce887b18ac0cb02fbd311b3a.jpg",
        header: "https://i.pinimg.com/736x/39/38/7f/39387fc7a23ae68f20f962fd2c9b2bab.jpg"
      },
      {
        communityId: 6,
        profile: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsaW5nfGVufDB8fDB8fHww&w=1000&q=80",
        header: "https://i.pinimg.com/736x/fc/3d/fa/fc3dfa2e7a902db1f7cc844c3a40f19d.jpg"
      },
      {
        communityId: 7,
        profile: "https://assets.heart.co.uk/2011/05/james-franco-1296481745-view-0.jpg",
        header: "https://i.pinimg.com/originals/73/d7/15/73d715e0736058fece69c34774194845.jpg"
      },
      {
        communityId: 4,
        profile: "https://pbs.twimg.com/media/EHnAGckWwAE1lT7.jpg",
        header: "https://data.whicdn.com/images/101705264/original.jpg"
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'communityStyles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
