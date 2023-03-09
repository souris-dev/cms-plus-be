'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Fields', 'contentTypeId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'ContentTypes'
        },
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('Fields', 'contentTypeId');
  }
};
