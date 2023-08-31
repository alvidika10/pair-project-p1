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
  UserProfile.beforeCreate(instances => {
    if (!instances.UserId) {
      // Find the maximum UserId in the database and increment it by 1
      const maxUserId =   UserProfile.max('UserId', { transaction: options.transaction });
      instances.UserId = (maxUserId || 0) + 1;
    }
  })
  return UserProfile;
};