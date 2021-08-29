module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING },
    },
    { timestamps: false },
  );
  return User;
};
