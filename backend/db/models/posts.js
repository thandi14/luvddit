'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Posts.hasMany(
        models.Comments,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
      Posts.hasMany(
        models.PostImages,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
      Posts.hasMany(
        models.postsHistories,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
      Posts.belongsTo(
        models.Communities,
          { foreignKey: 'communityId' }
      );
      Posts.hasMany(
        models.Votes,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  Posts.init({
    communityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    description: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    tags: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    votes: DataTypes.INTEGER,
    downVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
