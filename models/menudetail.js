'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MenuDetail.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MenuDetail',
  });
  return MenuDetail;
};