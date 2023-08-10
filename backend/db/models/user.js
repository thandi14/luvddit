'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    karma: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
