const { User } = require('../models');

const getProfile = async (userId) => User.findOne({ where: { id: userId } });

module.exports = {
  getProfile,
};
