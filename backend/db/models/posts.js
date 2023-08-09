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
      Posts.belongsToMany(
        models.Communities,
          { through: models.CommunityPosts,
            foreignKey: 'bookId',
            otherKey: 'readerId'
          }
          // additional attributes for the join table can be included in the options
      );
    }
  }
  Posts.init({
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    votes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
