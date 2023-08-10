'use strict';

const { Communities } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Communities.bulkCreate([
      {
       userId: 2,
       name: "Foodie",
       about: "Share your mouthwatering meals, tempting treats, and impressive plating skills. Don't forget to include recipes, cooking tips, and tricks to inspire others."
      },
      {
        userId: 1,
        name: "FashionFinesse",
        about: "l/FashionFinesse, where style enthusiasts from around the world gather to celebrate the ever-evolving world of clothing and personal expression."
      },
      {
        userId: 3,
        name: "Travel Tales",
        about: " Share your most memorable travel stories, from epic road trips to off-the-beaten-path discoveries. Whether it's conquering a mountain peak, navigating bustling markets, or simply getting lost in a foreign city, your journey matters here."
      },
      {
        userId: 1,
        name: "Movie Night",
        about: "Movie recommendations for films with iconic directors, and emerging talents. From indie gems to Hollywood spectacles, bring your thoughts and opinions here."
      },
      {
        userId: 3,
        name: "Pets",
        about: "Share snapshots of your furry, feathered, or scaly friends in all their adorable glory. From playful antics to heart-melting moments, every pet's personality shines here."
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Communities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options.tableName, null, {})
    // await queryInterface.bulkDelete('Communities', null, {});

  }
};
