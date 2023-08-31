'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile);
      User.hasMany(models.Order)
      User.belongsToMany(models.Menu, {through: models.Order});
    }
  }
  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Nama harus diisi!"
        },
        notEmpty:{
          msg: "Nama harus diisi!"
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Email harus diisi!"
        },
        notEmpty:{
          msg: "Email harus diisi!"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Password harus diisi!"
        },
        notEmpty:{
          msg: "Password harus diisi!"
        }
      }
    },
    role:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: "Role harus diisi!"
        },
        notEmpty:{
          msg: "Role harus diisi!"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(instances => {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(instances.password, salt)
    instances.password = hash
  })
  return User;
};