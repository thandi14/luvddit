'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommunityStyles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      communityId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Communities',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      icon: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      highlight: {
        type: Sequelize.STRING,
        defaultValue: "0079D3"
      },
      background: {
        type: Sequelize.STRING,
        defaultValue: "#DAE0E6"
      },
      base: {
        type: Sequelize.STRING,
        defaultValue: "0079D3"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "CommunityStyles";
    await queryInterface.dropTable(options);
  }
};
