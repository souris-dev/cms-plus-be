'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('InstanceData', 'instanceId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'ContentInstances'
        },
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    });

    await queryInterface.addColumn('InstanceData', 'fieldId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Fields'
        },
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('InstanceData', 'contentTypeId');
    await queryInterface.removeColumn('InstanceData', 'fieldId');
  }
};
