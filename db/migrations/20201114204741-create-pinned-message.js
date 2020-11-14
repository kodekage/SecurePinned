'use strict';
const { Deferrable } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PinnedMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_message_id: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      pinned_by: {
        type: Sequelize.STRING(50),
        allowNull: false,
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
      message: {
        type: Sequelize.STRING(2000),
        allowNull: false
      },
      message_timestamp: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      pinned_channel: {
        type: Sequelize.STRING(20),
        references: {
          model: 'Channels',
          key: 'channel_id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false
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
    await queryInterface.dropTable('PinnedMessages');
  }
};