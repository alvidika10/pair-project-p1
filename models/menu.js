'use strict';
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
  })
  return Menu;
};