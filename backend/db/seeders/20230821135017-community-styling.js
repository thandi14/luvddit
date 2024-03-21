'use strict';

const { CommunityStyle } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await CommunityStyle.bulkCreate([
      {
        communityId: 8,
        icon: "https://e0.pxfuel.com/wallpapers/295/904/desktop-wallpaper-cute-anime-dogs-cute-cartoon-dogs.jpg",
        banner: "https://i.pinimg.com/originals/1c/ee/26/1cee26383ae282b179ec4ee097fa9d19.jpg"
      },
      {
        communityId: 5,
        icon: "https://i.pinimg.com/736x/7a/82/00/7a82006cce887b18ac0cb02fbd311b3a.jpg",
        banner: "https://i.pinimg.com/736x/39/38/7f/39387fc7a23ae68f20f962fd2c9b2bab.jpg",
        base: "#e7d6c1",
        highlight: "#e7d6c1"
      },
      {
        communityId: 6,
        icon: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsaW5nfGVufDB8fDB8fHww&w=1000&q=80",
        banner: "https://i.pinimg.com/736x/fc/3d/fa/fc3dfa2e7a902db1f7cc844c3a40f19d.jpg",
        base: "#5a60dc",
        highlight: "#5a60dc"
      },
      {
        communityId: 7,
        icon: "https://assets.heart.co.uk/2011/05/james-franco-1296481745-view-0.jpg",
        banner: "https://i.pinimg.com/originals/73/d7/15/73d715e0736058fece69c34774194845.jpg"
      },
      {
        communityId: 4,
        icon: "https://pbs.twimg.com/media/EHnAGckWwAE1lT7.jpg",
        banner: "https://i.pinimg.com/564x/7b/6c/c1/7b6cc129fa555bb58699d3d5c60e9c1a.jpg"
      },
      {
        communityId: 10,
        base: "hotpink",
        highlight: "hotpink",
        icon: "https://i.pinimg.com/736x/36/ad/21/36ad21ba52efe38dc92cf7372b7b8bb5.jpg"
      },
      {
        communityId: 11,
        icon: "https://styles.redditmedia.com/t5_m24xw/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfNmFjYjhmYjgyODgwZDM5YzJiODQ0NmY4Nzc4YTE0ZDM0ZWU2Y2ZiN18xNTQzMzM_rare_4eff536a-4e0b-4ac3-9d9b-7b6263812868-headshot.png?width=256&height=256&crop=256:256,smart&s=1e75d139ac7bcdba5c1b0eaa77d0ead33c3e5450",
      },
      {
        communityId: 1,
        icon: "https://styles.redditmedia.com/t5_d2buc/styles/profileIcon_snooa04077d8-9493-470b-999a-225f85fb1f81-headshot.png?width=256&height=256&crop=256:256,smart&s=ff00bbfbd9a87f085dfbe7b2b0d60d1e3925f7fa",
      },
      {
        communityId: 2,
        icon: "https://styles.redditmedia.com/t5_1y3b96/styles/profileIcon_snoo506cc1fb-a00a-4fd4-bd86-9d69f8c9ca8f-headshot-f.png?width=256&height=256&crop=256:256,smart&s=a6098acf1b2fdebffee4d55111ae9ccbeaeccf87",
      },
      {
        communityId: 3,
        icon: "https://styles.redditmedia.com/t5_1gjm3t/styles/profileIcon_snoobc63674a-1613-405e-bf4f-79df37e50785-headshot.png?width=256&height=256&crop=256:256,smart&s=716009e720fe5375ec7fa847c7a91b83ec2f8f86",
      },
      {
        communityId: 27,
        icon: "https://styles.redditmedia.com/t5_44k2jy/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfYzhkM2EzYTgzYmRlNWRhZDA2ZDQzNjY5NGUzZTIyYWMzZTY0ZDU3N18zNTk2ODk5_rare_ac425a16-0688-47a6-bfb8-df322ee4b144-headshot.png?width=256&height=256&crop=256:256,smart&s=828d7ba4ddfedc4da7538fd61785733bfb149f74",
      },
      {
        communityId: 26,
        icon: "https://styles.redditmedia.com/t5_3kpqb/styles/profileIcon_snood8614e33-7e92-4675-862c-aa4802aac64a-headshot-f.png?width=256&height=256&crop=256:256,smart&s=11d02e4274fe2efb81729cb43893a9fd9c91134f",
      },
      {
        communityId: 25,
        icon: "https://styles.redditmedia.com/t5_1gjm3t/styles/profileIcon_snoobc63674a-1613-405e-bf4f-79df37e50785-headshot.png?width=256&height=256&crop=256:256,smart&s=716009e720fe5375ec7fa847c7a91b83ec2f8f86",
      },
      {
        communityId: 24,
        icon: "https://styles.redditmedia.com/t5_mr2je/styles/profileIcon_snoo7e98cb29-800e-4b54-b88b-d4c89f47309e-headshot.png?width=256&height=256&crop=256:256,smart&s=db55169a62007e714ce080eb5df9ea78e93ea85a",
      },
      {
        communityId: 23,
        icon: "https://styles.redditmedia.com/t5_3kpqb/styles/profileIcon_snood8614e33-7e92-4675-862c-aa4802aac64a-headshot-f.png?width=256&height=256&crop=256:256,smart&s=11d02e4274fe2efb81729cb43893a9fd9c91134f",
      },
      {
        communityId: 22,
        icon: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png",
      },
      {
        communityId: 21,
        icon: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png",
      },
      {
        communityId: 20,
        icon: "https://styles.redditmedia.com/t5_54vsb7/styles/profileIcon_snoo05eb8ccd-f9f3-4430-8a60-acfd1405a156-headshot.png?width=256&height=256&crop=256:256,smart&s=e575ec0f828ebf600d7f4decb2517e10a77efd6e",
      },
      {
        communityId: 19,
        icon: "https://styles.redditmedia.com/t5_dettz/styles/profileIcon_snoo2dd526f2-5ca6-4d10-b69e-56918f7e350b-headshot.png?width=256&height=256&crop=256:256,smart&s=2872152ef5921f769b658a8aa26f30460e542277",
      },
      {
        communityId: 18,
        icon: "https://styles.redditmedia.com/t5_92jlk/styles/profileIcon_snoo632df1bb-9612-4276-9ff4-ddc31583782b-headshot.png?width=256&height=256&crop=256:256,smart&s=75b945569593a563d11be782502be7af32c15623",
      },
      {
        communityId: 17,
        icon: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png",
      },
      {
        communityId: 16,
        icon: "https://styles.redditmedia.com/t5_lzkfv/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfYzhkM2EzYTgzYmRlNWRhZDA2ZDQzNjY5NGUzZTIyYWMzZTY0ZDU3N180Mjc2MTQy_rare_419f9e09-1adb-49a6-9fb0-9a491ff2552a-headshot.png?width=256&height=256&crop=256:256,smart&s=96758b4b147fe7c1a07d29df996e54056e300832",
      },
      {
        communityId: 15,
        icon: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png",
      },
      {
        communityId: 14,
        icon: "https://styles.redditmedia.com/t5_1upkyi/styles/profileIcon_snoo23b1a1aa-6727-40a2-b615-37af50a54c29-headshot.png?width=256&height=256&crop=256:256,smart&s=cd008cc4e1cd7ca3e5f9a1b510e6ac7217fa654f",
      },
      {
        communityId: 13,
        icon: "https://styles.redditmedia.com/t5_29p3lp/styles/profileIcon_snoocd4f4eea-c646-47b2-be35-fd1f55e7de2f-headshot.png?width=256&height=256&crop=256:256,smart&s=f0784f7c47bcd868d0bde3fb67c3242df401bd37",
      },
      {
        communityId: 12,
        icon: "https://styles.redditmedia.com/t5_b0gnx/styles/profileIcon_snood1f26cd7-77c7-4bbc-ae1c-99abcb197480-headshot-f.png?width=256&height=256&crop=256:256,smart&s=92805d9148c9cf1ffa7ece76d34d857429069348",
      },
      {
        communityId: 9,
        icon: "https://pbs.twimg.com/media/FiruQNrWIAA7DV8.jpg",
        banner: "https://i.pinimg.com/originals/3f/3d/9b/3f3d9b221088cb6524317c5b649a656d.gif"
      },

    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CommunityStyles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
