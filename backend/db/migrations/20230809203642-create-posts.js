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
      communityId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Communities',
            key: 'id',
        },
        onDelete: 'cascade'
      },
      userId:
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'cascade'
      },
      votes: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Posts";
    await queryInterface.dropTable('Posts');
  }
};
