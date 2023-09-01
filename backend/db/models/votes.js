'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(
        models.Posts,
          { foreignKey: 'postId' }
      );
      Votes.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Votes.belongsTo(
        models.Comments,
          { foreignKey: 'commentId' }
      );
    }
  }
  Votes.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    upVote: DataTypes.INTEGER,
    downVote: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Votes',
  });
  return Votes;
};
