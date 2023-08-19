'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Posts,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );
      User.hasMany(
        models.Comments,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );
      User.hasMany(
        models.Communities,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );
      User.belongsToMany(
        models.Communities,
          { through: models.CommunityMembers,
            foreignKey: 'userId',
            otherKey: 'communityId'
          }
      );
      User.hasMany(
        models.Votes,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );

    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    karma: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
