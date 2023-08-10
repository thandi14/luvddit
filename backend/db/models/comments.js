'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Comments.belongsTo(
        models.Posts,
          { foreignKey: 'postId' }
      );
    }
  }
  Comments.init({
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    parent: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
