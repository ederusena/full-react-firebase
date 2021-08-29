module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING },
      price: { type: DataTypes.FLOAT },
      url_image: { type: DataTypes.STRING },
    },
    { timestamps: false },
  );
  Product.associate = (models) => {
    Product.hasMany(models.Sale_Product,
      { foreignKey: 'product_id', as: 'productData' });
  };
  Product.associate = (models) => {
    Product.belongsToMany(models.Sale,
      { through: 'Sale_Products', foreignKey: 'product_id', as: 'product' });
  };
  return Product;
};
