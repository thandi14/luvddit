'use strict';

const { PostImages } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    PostImages.bulkCreate([
      {
        imgURL: "https://www.lizshealthytable.com/wp-content/uploads/2017/09/Cheddar-Chive-Burger.jpg",
        postId: 1
      },
      {
        imgURL: "https://yourdreamcoffee.com/wp-content/uploads/2021/07/latte-recipe-scaled.jpeg",
        postId: 2
      },
      {
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
        postId: 3
      },
      {
        imgURL: "https://tastesbetterfromscratch.com/wp-content/uploads/2023/06/Pepperoni-Pizza-1.jpg",
        postId: 4
      },
      {
        imgURL: "https://resize.img.allw.mn/filters:format(webp)/filters:quality(70)/content/iv/nn/mdraz79l5771f4488784e953289055_600x749.jpg",
        postId: 5
      },
      {
        imgURL: "https://hips.hearstapps.com/hmg-prod/images/st-lucia-154917524-1494616323.jpg",
        postId: 32
      },
      {
        imgURL: "https://hips.hearstapps.com/hbz.h-cdn.co/assets/16/16/bora-bora-gettyimages-575766591.jpg?crop=1.0xw:1xh;center,top&resize=980:*",
        postId: 32
      },
      {
        imgURL: "https://i.pinimg.com/736x/c7/44/15/c7441501cea67b210e05b06ceec545a4.jpg",
        postId: 6
      },
      {
        imgURL: "https://i.pinimg.com/originals/70/9b/2f/709b2f3e00782ccc2de3e88b3f852a76.jpg",
        postId: 8
      },
      {
        imgURL: "https://i.pinimg.com/736x/3d/4d/f5/3d4df5b12bb4208c466d6f470d8a9785.jpg",
        postId: 8
      },
      {
        imgURL: "https://i.pinimg.com/736x/dd/a3/2b/dda32b5259dbfbba2807f319880b2376.jpg",
        postId: 8
      },
      {
        imgURL: "https://www.sugarsaltmagic.com/wp-content/uploads/2022/04/Pasta-Napoletana-5FEAT.jpg",
        postId: 9
      },
      {
        imgURL: "https://i.pinimg.com/1200x/e4/5f/9c/e45f9c1cc4bd6cc0208aa71f86a031b9.jpg",
        postId: 13
      },
      {
        imgURL: "https://i.pinimg.com/736x/d6/bc/b9/d6bcb947046ca6356a80a717bca6375e.jpg",
        postId: 14
      },
      {
        imgURL: "https://i.pinimg.com/1200x/44/25/6e/44256ef36e999836f38435ac78d1b637.jpg",
        postId: 16
      },
      {
        imgURL: "https://i.pinimg.com/736x/a2/f7/53/a2f75314057b3f649622615ec9a08de1.jpg",
        postId: 18
      },
      {
        imgURL: "https://images.pexels.com/photos/1624255/pexels-photo-1624255.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1624255.jpg&fm=jpg",
        postId: 22
      },
      {
        imgURL: "https://s3-media0.fl.yelpcdn.com/bphoto/2QCZODlAd4U6hKQ2HmypWQ/348s.jpg",
        postId: 25
      },
      {
        imgURL: "https://media.worldnomads.com/Explore/cambodia/ancient-sites-cambodia-lead-kellybeckta.jpg",
        postId: 24
      },
      {
        imgURL: "https://i.pinimg.com/736x/b3/47/98/b34798360e8445729d99d4972eb91ece.jpg",
        postId: 56
      },
      {
        imgURL: "https://static.vinwonders.com/production/Vietnamese-street-food-1.jpg",
        postId: 61
      },
      {
        imgURL: "https://i.pinimg.com/736x/d0/80/91/d08091fdeca965109374a7f28439b117.jpg",
        postId: 65
      },
      {
        imgURL: "https://i.ebayimg.com/images/g/FNUAAOSwgSNglOtx/s-l1200.webp",
        postId: 68,
      },
      {
        imgURL: "https://i.pinimg.com/736x/70/c2/e7/70c2e736f7cefcaa36feaf0a91e7fe80.jpg",
        postId: 17,
      },
      {
        imgURL: "https://i.pinimg.com/564x/05/68/9b/05689b6b841bd305a303ff4b9acdf3a1.jpg",
        postId: 17,
      },
      {
        imgURL: "https://i.pinimg.com/736x/a0/a4/f6/a0a4f6fef01aaae904807a922c967a18.jpg",
        postId: 17,
      },
      {
        imgURL: "https://i.pinimg.com/1200x/9d/6e/86/9d6e864d936019aab066fb7c7319ee13.jpg",
        postId: 11,
      },
      {
        imgURL: "https://i.pinimg.com/736x/1f/9d/65/1f9d6549636fe95e29c83eaa59c10d61.jpg",
        postId: 11,
      },
      {
        imgURL: "https://i.pinimg.com/736x/4f/0e/dd/4f0eddc4a5b5b426b2b6352f32294067.jpg",
        postId: 23,
      },
      {
        imgURL: "https://i.pinimg.com/1200x/9c/11/9a/9c119ada70944edbcf9e8b9fe2e6c656.jpg",
        postId: 27,
      },
      {
        imgURL: "https://i.pinimg.com/originals/cb/f0/c4/cbf0c4206e04e026a54494a52f34f906.jpg",
        postId: 27,
      },
      {
        imgURL: "https://i.pinimg.com/1200x/8f/29/fa/8f29fa01331463181eb6c5d299d210ea.jpg",
        postId: 27,
      },
      {
        imgURL: "https://i.pinimg.com/564x/26/22/80/2622809bc9e37be7e072eab8385c9428.jpg",
        postId: 20,
      },
      {
        imgURL: "https://i.pinimg.com/550x/62/ff/b2/62ffb2273ea333747a7a64f2d043af7b.jpg",
        postId: 29
      },
      {
        imgURL: "https://drive.google.com/uc?export=view&id=1czPG1YFkAfew8_eEBofhoD_P9Xx1ATvs",
        postId: 69
      },
      {
        imgURL: 'https://drive.google.com/uc?export=view&id=1bnt-Z8meSaiqrqExB3xMT7tY-7RlpNOC',
        postId: 69
      },
      {
        imgURL: 'https://drive.google.com/uc?export=view&id=1wP6nRrTIYoN_3pjO7UYgzeNRtpwwZh4k',
        postId: 69
      },
      {
        imgURL: 'https://drive.google.com/uc?export=view&id=1czPG1YFkAfew8_eEBofhoD_P9Xx1ATvs',
        postId: 70
      },
      {
        imgURL: 'https://drive.google.com/uc?export=view&id=1CoX-lchXGOE9njKhIjQAd0Hv2uXrxNT2',
        postId: 70
      },
    ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PostImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
