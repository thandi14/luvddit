'use strict';

const { Community } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Community.bulkCreate([
      {
        userId: 1,
        name: "Demo-lition",
        type: "Profile"
      },
      {
        userId: 2,
        name: "FakeUser1",
        type: "Profile"
      },
      {
        userId: 3,
        name: "FakeUser2",
        type: "Profile"
      },
      {
       userId: 2,
       name: "Foodie",
       type: "Restricted",
       about: "Share your mouthwatering meals, tempting treats, and impressive plating skills. Don't forget to include recipes, cooking tips, and tricks to inspire others."
      },
      {
        userId: 1,
        name: "FashionFinesse",
        type: "Restricted",
        about: "l/FashionFinesse, where style enthusiasts from around the world gather to celebrate the ever-evolving world of clothing and personal expression."
      },
      {
        userId: 13,
        name: "Travel Tales",
        type: "Restricted",
        about: "Share your most memorable travel stories, from epic road trips to off-the-beaten-path discoveries. Whether it's conquering a mountain peak, navigating bustling markets, or simply getting lost in a foreign city, your journey matters here."
      },
      {
        userId: 17,
        name: "Movie Night",
        type: "Restricted",
        about: "Movie recommendations for films with iconic directors, and emerging talents. From indie gems to Hollywood spectacles, bring your thoughts and opinions here."
      },
      {
        userId: 3,
        name: "Pets",
        type: "Restricted",
        about: "Share snapshots of your furry, feathered, or scaly friends in all their adorable glory. From playful antics to heart-melting moments, every pet's personality shines here."
      },
      {
        userId: 4,
        name: "Thandi14",
        type: "Profile"
      },
      {
        userId: 4,
        name: "Help",
        type: "Restricted",
        about: "A subreddit to ask questions (and get answers) about Luvditt Tech Support.",
        tabOne: "https://github.com/thandi14",
        tabTwo: "https://www.linkedin.com/in/thandi-mpofu-b15784275/",
        tabThree: "https://thandi14.github.io/thandi14github.io/"

      },
      {
        userId: 5,
        name: "StarGazer42",
        type: "Profile"
      },
      {
        userId: 6,
        name: "PixelNinja",
        type: "Profile"
      },
      {
        userId: 7,
        name: "MidnightRider",
        type: "Profile"
      },
      {
        userId: 8,
        name: "RainbowDreamer",
        type: "Profile"
      },
      {
        userId: 9,
        name: "TechGeek123",
        type: "Profile"
      },
      {
        userId: 10,
        name: "CoffeeLover88",
        type: "Profile"
      },
      {
        userId: 11,
        name: "MusicMaven21",
        type: "Profile"
      },
      {
        userId: 12,
        name: "AdventureSeeker",
        type: "Profile"
      },
      {
        userId: 13,
        name: "NatureExplorer",
        type: "Profile"
      },
      {
        userId: 14,
        name: "FitnessFreak77",
        type: "Profile"
      },
      {
        userId: 15,
        name: "GreatExplorer",
        type: "Profile"
      },
      {
        userId: 16,
        name: "FreakyFreak23",
        type: "Profile"
      },
      {
        userId: 17,
        name: "Bookworm22",
        type: "Profile"
      },
      {
        userId: 18,
        name: "SkyDiver99",
        type: "Profile"
      },
      {
        userId: 19,
        name: "BeachBum44",
        type: "Profile"
      },
      {
        userId: 20,
        name: "GamerGirl55",
        type: "Profile"
      },
      {
        userId: 21,
        name: "ArtisticSoul",
        type: "Profile"
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Communities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})

  }
};
