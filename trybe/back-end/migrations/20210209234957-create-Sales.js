module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Sales = queryInterface.createTable('Sales', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      total_price: { type: Sequelize.FLOAT, allowNull: false },
      delivery_address: { type: Sequelize.STRING, allowNull: false },
      delivery_number: { type: Sequelize.INTEGER, allowNull: false },
      sale_date: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
      update_date: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'Pendente' },
    });
    return Sales;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Sales', {}),
};
