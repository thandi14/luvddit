'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Communities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Communities.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Communities.belongsToMany(
        models.Posts,
          { through: models.CommunityPosts,
            foreignKey: 'communityId',
            otherKey: 'postId'
          }
          // additional attributes for the join table can be included in the options
      );
      Communities.belongsToMany(
        models.User,
          { through: models.CommunityMembers,
            foreignKey: 'communityId',
            otherKey: 'userId'
          }
          // additional attributes for the join table can be included in the options
      );
    }
  }
  Communities.init({
    userId: DataTypes.INTEGER,
    about: DataTypes.STRING,
    karma: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Communities',
  });
  return Communities;
};
