'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.hasMany(models.Menu);
      Restaurant.belongsToMany(models.User, {through: "Orders"});
    }
  }
  Restaurant.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};