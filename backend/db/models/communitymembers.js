'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommunityMembers extends Model {
    static associate(models) {
      // define association here
      CommunityMembers.belongsTo(
        models.User,
        { foreignKey: 'userId'}
      )
      CommunityMembers.belongsTo(
        models.Communities,
        { foreignKey: 'communityId'}
      )
    }
  }
  CommunityMembers.init({
    communityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommunityMembers',
  });
  return CommunityMembers;
};
