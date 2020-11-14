'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Workspaces', 'workspace_id', {
          type: Sequelize.DataTypes.STRING(20),
          unique: true,
          allowNull: false
        }, { transaction: t}),
        queryInterface.changeColumn('Workspaces', 'workspace_domain', {
          type: Sequelize.DataTypes.STRING(50),
          unique: true,
          allowNull: false
        }, { transaction: t}),
        queryInterface.changeColumn('Workspaces', 'workspace_logo', {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
        }, { transaction: t})
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Workspaces', 'workspace_id', { transaction: t}),
      queryInterface.removeColumn('Workspaces', 'workspace_domain', { transaction: t}),
      queryInterface.removeColumn('Workspaces', 'workspace_logo', { transaction: t})
    ])
  }
};
