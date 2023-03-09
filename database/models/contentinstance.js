'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContentInstance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContentInstance.belongsTo(models.ContentType, {
        foreignKey: 'contentTypeId'
      });
      ContentInstance.hasMany(models.InstanceData, {
        foreignKey: 'instanceId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  ContentInstance.init({
    contentTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ContentInstance',
  });
  return ContentInstance;
};