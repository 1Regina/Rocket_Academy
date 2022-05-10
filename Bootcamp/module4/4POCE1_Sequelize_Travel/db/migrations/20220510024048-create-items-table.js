// running "npx sequelize migration:generate --name create-trips-table" creates this file
// something like this should appear in the terminal after running this command

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
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
        // underscored: true,
      },
    });
    await queryInterface.createTable('attractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      trip_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // This links the trip_id column to the id column in the trips table
        references: {
          model: 'trips',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    // underscored: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trips');
    await queryInterface.dropTable('attractions');
  },
};
