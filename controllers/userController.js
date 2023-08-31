const {User, UserProfile, Restaurant, Menu} = require("../models/index");
const bcrypt = require('bcryptjs')

class UserController{

    static formRegister(req,res){
        res.render('register')
    }

    static postRegister(req,res){
        console.log(req.body);
        const {name, email, password, role} = req.body
        User.create({name, email, password, role})
        .then(() => {
            // return UserProfile.create({gender,phone})
            res.redirect('/login')
        })
        .catch(err => res.send(err))
    }

    static formLogin(req,res){
        const {error} = req.query
        res.render('login', {error})
    }

    static postLogin(req,res){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(data => {
            if(data){
                req.session.email = data.email
                req.session.role = data.role
                const isValidPassword = bcrypt.compareSync(password, data.password)
                if(isValidPassword){
                    if(req.session.role === "user"){
                        res.redirect(`/user/${data.id}`)
                    } else {
                        res.redirect(`/admin/${data.id}`)
                    }
                } else {
                    let error = 'Email atau Password tidak sesuai!'
                    res.redirect(`/login?error=${error}`)
                }
            } else {
                let error = 'Email atau Password tidak sesuai!'
                res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => res.send(err))
    }

    static logout(req,res){
        req.session.destroy(err => {
            if(err) console.log(err);
            else{
                res.redirect('/')
            }
        })
    }

    static user(req, res) {
        const {id} = req.params
        UserProfile
            .findByPk(id, {include: User})
            .then(data => {
                // res.send(data)
                res.render('user-profile', {data})
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static restaurant(req, res) {
        // const {UserId} = req.params
        Restaurant
            .findAll({include: Menu})
            .then(data => {
                // res.send(data[0])
                res.render('restaurant-detail', {data})
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }


}

module.exports = UserController