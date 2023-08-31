'use strict';

const { Op } = require("sequelize");
const {priceFormat} = require('../helper/helper')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.Order)
      Menu.belongsToMany(models.User, {through: models.Order});
    }

    static menuList(search, option) {
      if (search) {
        option.where.name = {[Op.iLike]: `%${search}%`}
       } 
      return Menu.findAll(option)
    }

    showImage() {
      return this.imgUrl
    }

    formatStock() {
      if (this.stock === 1) {
        return `${this.stock} Item`
      }
      else {
        return `${this.stock} Items`
      }
    }

    get formatPrice() {
      return priceFormat(this.price)
    }

  }
  Menu.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.TEXT,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};