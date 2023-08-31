const {User, UserProfile, Menu, Order} = require("../models/index");
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize")
const {dateFormat} = require('../helper/helper')

class UserController{

    static home(req,res){
        res.render('home')
    }

    static formRegister(req,res){
        const {error} = req.query
        res.render('register', {error})
    }

    static postRegister(req,res){
        const {name,gender,phone, email, password, role} = req.body
        User.create({name, email, password, role})
        .then((user) => {
            return user.createUserProfile({gender,phone})
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
            if(err.name === "SequelizeValidationError"){
                let error = err.errors.map(el => el.message)
                res.redirect(`/register?error=${error}`)
            } else {
                res.send(err)
            }
        })
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
                req.session.UserId = data.id
                const isValidPassword = bcrypt.compareSync(password, data.password)
                if(isValidPassword){
                    if(req.session.role === "user"){
                        res.redirect(`/user`)
                    } else {
                        res.redirect(`/admin`)
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
        .catch(err => {
            console.log(err);
            res.send(err)
        })
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
        const {UserId} = req.session
        User
            .findByPk(UserId, {include: UserProfile})
            .then(data => {
                res.render('user-profile', {data})
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static menu(req, res) {
        const {search} = req.query

        let option = {
            order: [["name", "asc"]],
            where: {},
        }

        Menu
            .menuList(search, option) 
            .then(data => {
                res.render('menu-detail', {data, dateFormat})
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static buy(req, res) {
        res.send("buy")
    }
}

module.exports = UserController 