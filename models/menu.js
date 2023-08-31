'use strict';

const dayjs = require('dayjs');

const { Op } = require("sequelize");
const {priceFormat, expiredDate} = require('../helper/helper')


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

    get formatExpired() {
      return `Expired Date - ${expiredDate()}`
    }

  }
  Menu.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Nama makanan harus diisi!"
        },
        notEmpty:{
          msg: "Nama makanan harus diisi!"
        }
      }
    },
    imgUrl:{
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Foto makanan/minuman harus diisi!"
        },
        notEmpty:{
          msg: "Foto makanan/minuman harus diisi!"
        }
      }
    },
    category:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Deskripsi makanan harus diisi!"
        },
        notEmpty:{
          msg: "Deskripsi makanan harus diisi!"
        }
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Deskripsi makanan/minuman harus diisi!"
        },
        notEmpty:{
          msg: "Deskripsi makanan/minuman harus diisi!"
        }
      }
    },
    stock: DataTypes.INTEGER,
    price: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Harga harus diisi!"
        },
        notEmpty:{
          msg: "Harga harus diisi!"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Menu',
  });
  Menu.beforeCreate(instances => {
    instances.stock = 0
    instances.createdAt = dayjs();
    // console.log(instances.createdAt)
  })
  return Menu;
};