'use strict';
const {
  Model, Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PinnedMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PinnedMessage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    client_message_id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    pinned_by: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    workspace_id: {
      type: DataTypes.STRING(20),
      references: {
        model: 'Workspaces',
        key: 'workspace_id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      },
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    message_timestamp: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    pinned_channel: {
      type: DataTypes.STRING(20),
      references: {
        model: 'Channels',
        key: 'channel_id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      },
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'PinnedMessage',
  });
  return PinnedMessage;
};