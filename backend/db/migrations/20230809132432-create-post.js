'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      communityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Communities',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      title: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      tags: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      deletedAt: {
        type: Sequelize.DATE
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
    options.tableName = "Posts";
    await queryInterface.dropTable(options);
  }
};
