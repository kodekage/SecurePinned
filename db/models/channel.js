'use strict';
const {
  Model, Deferrable, DataTypes
} = require('sequelize');
const sequelize = require('../db');
const Pinnedmessage = require('./pinnedmessage')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Channel.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    channel_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    channel_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Channel',
  });

  Channel.hasMany(Pinnedmessage)

  return Channel;
};