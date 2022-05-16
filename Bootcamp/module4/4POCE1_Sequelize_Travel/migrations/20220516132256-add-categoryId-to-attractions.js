module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('attractions', 'categoryId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('attractions', 'categoryId');
  },
};
