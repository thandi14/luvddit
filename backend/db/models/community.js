'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Community.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Community.hasOne(
        models.CommunityStyle,
          { foreignKey: 'communityId', onDelete: 'CASCADE',  hooks: true }
      );
      Community.hasMany(
        models.Post,
          { foreignKey: 'communityId', onDelete: 'CASCADE',  hooks: true }
      );
      // additional attributes for the join table can be included in the options
      Community.belongsToMany(
        models.User,
          { through: models.CommunityMembers,
            foreignKey: 'communityId',
            otherKey: 'userId'
          }
          // additional attributes for the join table can be included in the options
      );
    }
  }
  Community.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    about: DataTypes.TEXT,
    type: {
      type: DataTypes.STRING,
      defaultValue: "Public"
    },
    tabOne: DataTypes.STRING,
    tabTwo: DataTypes.STRING,
    tabThree: DataTypes.STRING,
    tabFour: DataTypes.STRING,
    tabFive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Community',
  });
  return Community;
};
