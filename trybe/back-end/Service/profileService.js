const { User } = require('../models');

const update = async (name, email) => {
  if (!/^[A-Za-z \s]{12,}$/.test(name)) {
    return {
      error: true,
      code: 'Nome inválido',
      message: 'O nome deve conter, no mínimo, 12 letras, sem números ou caracteres especiais',
      statusCode: 401,
    };
  }
  return User.update({ name, email }, { where: { email } });
};

module.exports = {
  update,
};
