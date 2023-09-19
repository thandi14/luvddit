'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostSetting.belongsTo(
        models.Post,
          { foreignKey: 'postId' }
      );
      PostSetting.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
    }
  }
  PostSetting.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    history: DataTypes.DATE,
    saved: DataTypes.DATE,
    hidden: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PostSetting',
  });
  return PostSetting;
};
