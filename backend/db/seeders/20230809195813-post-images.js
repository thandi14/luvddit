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
      }
    ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PostImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
