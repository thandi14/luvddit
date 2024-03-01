'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentSetting.belongsTo(
        models.Comments,
          { foreignKey: 'commentId' }
      );
      CommentSetting.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
    }
  }
  CommentSetting.init({
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    saved: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CommentSetting',
  });
  return CommentSetting;
};
