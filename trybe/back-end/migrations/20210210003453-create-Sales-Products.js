module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salesProducts = queryInterface.createTable('Sale_Products', {
      id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER, allowNull: false },
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Sales', key: 'id' },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Products', key: 'id' },
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
    });
    return salesProducts;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Sale_Products', {}),
};
