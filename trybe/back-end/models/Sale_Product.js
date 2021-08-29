module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'Sale_Product',
    {
      sale_id: {
        type: DataTypes.INTEGER, foreignKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER, foreignKey: true,
      },
      quantity: { type: DataTypes.INTEGER },
    },
    { timestamps: false },
  );
  saleProduct.associate = (models) => {
    saleProduct.belongsTo(models.Product,
      { foreignKey: 'product_id', as: 'productId' });
  };
  saleProduct.associate = (models) => {
    saleProduct.belongsTo(models.Sale,
      { foreignKey: 'sale_id', as: 'saleId' });
  };

  /* saleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale,
      { through: saleProduct, foreignKey: 'product_id', as: 'Products', otherKey: 'sale_id' });
  };
  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product,
      { through: saleProduct, foreignKey: 'sale_id', as: 'Sales', otherKey: 'product_id' });
  }; */
  return saleProduct;
};
