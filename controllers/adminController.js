const {User, UserProfile, Restaurant, Menu} = require('../models/index')

class AdminController{
    static admin(req,res){
        const {UserId} = req.session
        let options = {
            where:{
                id:UserId
            },
            include:[
                {
                    model: UserProfile,
                }
            ]
        }
        let data = []
        User.findOne(options)
        .then(result => {
            data = result
            return Restaurant.findAll({include:Menu})
        })
        .then(rest => {
            res.render('admin', {data, rest})
        })
        .catch(err =>{
            console.log(err);
            res.send(err)
        })
    }

    static addMenuForm(req,res){
        Restaurant.findOne({attributes: ['id']})
        .then(restId => {
            res.render('addMenuForm', {restId})
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }
    static addMenuProcess(req,res){
        const {RestaurantId} = req.params
        const {name,imgUrl,category,description,stock,price} = req.body
        Menu.create({name,imgUrl,category,description,stock,price, RestaurantId})
    }
}


module.exports = AdminController