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
        imgURL: "https://i.pinimg.com/736x/c7/44/15/c7441501cea67b210e05b06ceec545a4.jpg",
        postId: 6
      },
      {
        imgURL: "https://i.pinimg.com/originals/70/9b/2f/709b2f3e00782ccc2de3e88b3f852a76.jpg",
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
      }
    ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PostImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
