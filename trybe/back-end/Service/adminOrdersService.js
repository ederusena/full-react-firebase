const { Sale } = require('../models');

const getAdminOrders = async () => Sale.findAll();

const changeStatus = async (id, status) => {
  if (!id) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe um número de pedido válido.',
      statusCode: 401,
    };
  }
  if (!status) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe o status atual do pedido.',
      statusCode: 401,
    };
  }
  if ((status !== 'Pendente' && status !== 'Preparando')) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe o status válido.',
      statusCode: 401,
    };
  }
  const saidaStatus = status === 'Pendente' ? 'Preparando' : 'Entregue';
  return Sale.update({ status: saidaStatus }, { where: { id } });
};

module.exports = {
  getAdminOrders,
  changeStatus,
};
