const {User} = require("../models/index");
const bcrypt = require('bcryptjs')

class UserController{

    static formRegister(req,res){
        res.render('register')
    }

    static postRegister(req,res){
        console.log(req.body);
        const {name,email, password, role} = req.body
        User.create({name, email, password, role})
        .then(() => {
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
                const isValidPassword = bcrypt.compareSync(password, data.password)
                if(isValidPassword){
                    res.send("Sukses!")
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
}

module.exports = UserController