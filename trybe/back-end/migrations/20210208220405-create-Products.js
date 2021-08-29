module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Products = queryInterface.createTable('Products', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.FLOAT, allowNull: false },
      url_image: { type: Sequelize.STRING, allowNull: false },
    });
    return Products;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Products', {}),
};
