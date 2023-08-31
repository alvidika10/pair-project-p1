const {User, UserProfile, Restaurant} = require('../models/index')

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
            return Restaurant.findAll()
        })
        .then(rest => {
            res.render('admin', {data, rest})
        })
        .catch(err =>{
            console.log(err);
            res.send(err)
        })
    }
}


module.exports = AdminController