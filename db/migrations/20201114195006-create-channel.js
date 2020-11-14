'use strict';

const { Deferrable } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Channels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workspace_id: {
        type: Sequelize.STRING(20),
        references: {
          model: 'Workspaces',
          key: 'workspace_id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false,
      },
      channel_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      channel_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Channels');
  }
};