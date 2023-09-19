'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommunityMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommunityMembers.belongsTo(
        models.User,
        { foreignKey: 'userId'}
      )
      CommunityMembers.belongsTo(
        models.Community,
        { foreignKey: 'communityId'}
      )
    }
  }
  CommunityMembers.init({
    communityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status:  {
      type: DataTypes.STRING,
      defaultValue: "Approved"
    }
  }, {
    sequelize,
    modelName: 'CommunityMembers',
  });
  return CommunityMembers;
};
