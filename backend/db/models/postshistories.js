'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postsHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      postsHistories.belongsTo(
        models.Posts,
          { foreignKey: 'postId' }
      );
    }
  }
  postsHistories.init({
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'postsHistories',
  });
  return postsHistories;
};
