const { Sale_Product, Product, Sale } = require('../models');

const getOrders = async (userId) => Sale.findAll({ where: { userId } });

const getDetails = async (saleId) => {
  const saidaBruta = (
    await Sale_Product.findAll({
      where: { sale_id: saleId },
    })
  ).map((e) => e.dataValues);
  const saidaStatus = await Sale.findOne({
    where: { id: saleId },
  });
  const listaProdutos = (await Product.findAll()).map((e) => e.dataValues);
  const objProduto = listaProdutos.reduce((a, c) => ({ ...a, ...{ [c.id]: c } }), {});
  const teste = saidaBruta.map(({ id, sale_id, product_id, quantity }) => ({
    id,
    sale_id,
    product_id,
    quantity,
    name: objProduto[product_id].name,
    price: objProduto[product_id].price,
    status: saidaStatus.status,
  }));
  return teste;
};

module.exports = {
  getDetails,
  getOrders,
};
