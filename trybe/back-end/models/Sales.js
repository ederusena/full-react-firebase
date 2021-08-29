module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      total_price: { type: DataTypes.FLOAT },
      delivery_address: { type: DataTypes.STRING },
      delivery_number: { type: DataTypes.INTEGER },
      sale_date: { type: DataTypes.DATE },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      update_date: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING },
    },
    { timestamps: false },
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  // Nova Associação N:M
  /* Sale.associate = (models) => {
    Sale.belongsToMany(models.Product,
      { through: models.Sale_Product, foreignKey: 'sale_id', as: 'sales' });
  }; */
  return Sale;
};
