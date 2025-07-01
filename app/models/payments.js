const {Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'vendor',
      });
    }
  }

  Payment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        field: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    underscored: true,
    timestamps: true, 
  });

  return Payment;
}