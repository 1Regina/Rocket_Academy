// running "npx sequelize migration:generate --name create-items-table" creates this file
// something like this should appear in the terminal after running this command
​
// Sequelize CLI [Node: 15.14.0, CLI: 6.3.0, ORM: 6.12.0-alpha.1]
​
// migrations folder at "/home/michellemok/RA/ftbc5/sequelize/migrations" already exists.
// New migration was created at /home/michellemok/RA/ftbc5/sequelize/migrations/20211203063853-create-items-table.js .

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      // created_at and updated_at are required
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  },
};