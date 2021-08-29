const { Sale, Sale_Product } = require('../models');

const checkout = async (products, deliveryAddress, deliveryNumber, id) => {
  // console.log('FindUser =>', loginController.token.findUser);
  // console.log('service', products, deliveryAddress, deliveryNumber, id);
  if (!products || !deliveryAddress || !deliveryNumber) {
    return {
      error: true,
      code: 'field_not_filled',
      message: 'Verifique se todos os campos foram preenchidos.',
      statusCode: 401,
    };
  }
  if (typeof deliveryNumber !== 'number') {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe um número para o número do endereço.',
      statusCode: 401,
    };
  }
  const total = products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  // console.log('service.checkout', products, deliveryAddress, deliveryNumber, id);
  const sales = await Sale.create({
    userId: id,
    total_price: total,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
  });
  // console.log('sales===>', sales.id);
  const productList = products.map((product) => Sale_Product.create({
    sale_id: sales.id,
    product_id: product.id,
    quantity: product.quantity,
  }));
  const respostaLista = await Promise.all(productList);
  return {
    Produtos_adicionados: respostaLista.filter((e) => e.affectedRows).length,
    Total_Produtos: respostaLista.length,
  };
  // 'Total_Produtos':respostaLista.length-->
  // --> total de produtos enviados para serem acrescentados no banco
  // 'Produtos_adicionados':respostaLista.filter((e) => e.affectedRows).length -->
  // --> produtos que realmente foram acrescentados
};

module.exports = {
  checkout,
};
