'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Menu)
      Order.belongsTo(models.User)
    }
  }
  Order.init({
    amount: DataTypes.INTEGER,
    quantity:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Jumlah harus diisi!"
        },
        notEmpty:{
          msg: "Jumlah harus diisi!"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  Order.beforeCreate(instances => {
    instances.amount = 1
  })
  return Order;
};