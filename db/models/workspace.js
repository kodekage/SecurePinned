'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../db');
const Channel = require('./channel')(sequelize, DataTypes);

module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workspace.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    workspace_id: DataTypes.STRING,
    workspace_domain: DataTypes.STRING,
    workspace_logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Workspace',
  });

  Workspace.hasMany(Channel);
  return Workspace;
};