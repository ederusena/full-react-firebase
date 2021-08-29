module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.STRING, allowNull: false },
    });
    return Users;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users', {}),
};
