'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommunityStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommunityStyle.belongsTo(
        models.Community,
          { foreignKey: 'communityId' }
      );
    }
  }
  CommunityStyle.init({
    communityId: DataTypes.INTEGER,
    icon: DataTypes.TEXT,
    banner: DataTypes.TEXT,
    highlight: {
      type: DataTypes.STRING,
      defaultValue: "#0079D3"
    },
    background: {
      type: DataTypes.TEXT,
      defaultValue: "#DAE0E6"
    },
    base: {
      type: DataTypes.STRING,
      defaultValue: "#0079D3"
    },
  }, {
    sequelize,
    modelName: 'CommunityStyle',
  });
  return CommunityStyle;
};
