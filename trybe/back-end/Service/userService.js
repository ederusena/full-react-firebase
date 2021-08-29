const { User } = require('../models');

const create = async (name, email, password, role) => {
  const emailExists = await User.findOne({ where: { email } });
  if (!name || !email || !password) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  // console.log('duplicado ===>', emailExists);
  if (emailExists) {
    return {
      error: true,
      code: 'duplicate',
      message: 'Email already registered',
      statusCode: 409,
    };
  }
  return User.create({ name, email, password, role });
};

module.exports = {
  create,
};
