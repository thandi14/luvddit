'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Post.hasMany(
        models.Comments,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
      Post.hasMany(
        models.PostImages,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
      Post.hasOne(
        models.PostSetting,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
      Post.belongsTo(
        models.Community,
          { foreignKey: 'communityId' }
      );
      Post.hasMany(
        models.Votes,
          { foreignKey: 'postId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    communityId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    description: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    tags: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
