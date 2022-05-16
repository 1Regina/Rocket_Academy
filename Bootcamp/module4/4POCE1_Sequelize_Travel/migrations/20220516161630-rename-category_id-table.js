module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('attractions', 'categoryId', 'category_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('attractions', 'category_id', 'categoryId');
  },
};
