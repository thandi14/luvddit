'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class communityStyles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      communityStyles.belongsTo(
        models.Communities,
          { foreignKey: 'communityId' }
      );
    }

  }
  communityStyles.init({
    communityId: DataTypes.INTEGER,
    profile: DataTypes.STRING,
    header: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'communityStyles',
  });
  return communityStyles;
};
