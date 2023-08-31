'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }
  }
  UserProfile.init({
    gender:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Gender harus diisi!"
        },
        notEmpty:{
          msg: "Gender harus diisi!"
        }
      }
    },
    phone:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Nomor telepon harus diisi!"
        },
        notEmpty:{
          msg: "Nomor telepon harus diisi!"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};