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
      // define association here
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
      Posts.belongsTo(
        models.Communities,
          { foreignKey: 'communityId' }
      );
    }
  }
  Posts.init({
    communityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    votes: DataTypes.INTEGER,
    desciption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
