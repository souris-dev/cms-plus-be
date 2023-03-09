'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstanceData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InstanceData.belongsTo(models.ContentInstance);
      InstanceData.belongsTo(models.Field);
    }
  }
  InstanceData.init({
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InstanceData',
  });
  return InstanceData;
};