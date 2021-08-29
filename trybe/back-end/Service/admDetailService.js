const { Sale_Product, Product, Sale } = require('../models');

const getDetails = async (saleId) => {
  // solução alternativa até o sequelize many to many funcionar
  const saidaBruta = await Sale_Product.findAll({ where: { sale_id: saleId },
    // include: [{ model: Product, as: 'productData', attributes: ['id', 'name', 'price'] }],
  });
  const saidaStatus = await Sale.findOne({ where: { id: saleId },
    // include: [{ model: Product, as: 'productData', attributes: ['id', 'name', 'price'] }],
  });
  const listaProdutos = await Product.findAll();
  const objProduto = listaProdutos.reduce((a, c) => ({ ...a, ...{ [c.id]: c } }), {});

  return saidaBruta.map(({ id, sale_id, product_id, quantity }) => (
    {
      id,
      sale_id,
      product_id,
      quantity,
      name: objProduto[product_id].name,
      price: objProduto[product_id].price,
      status: saidaStatus.status,
    }));
};

module.exports = {
  getDetails,
};
