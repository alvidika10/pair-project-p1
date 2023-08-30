let isLoggedIn = function(req, res, next){
    if(!req.session.email){
      let error = 'Silahkan Login terlebih dahulu'
      res.redirect(`/login?error=${error}`)
    } else {
      next()
    }
  }
  let isAdmin = function(req, res, next){
    if(!req.session.role === "admin"){
      let error = 'Tidak dapat mengakses!'
      res.redirect(`/login?error=${error}`)
    } else {
      next()
    }
  }
  let isUser = function(req, res, next){
    if(!req.session.role === "user"){
      let error = 'Tidak dapat mengakses!'
      res.redirect(`/login?error=${error}`)
    } else {
      next()
    }
  }
module.exports = {isLoggedIn, isAdmin, isUser}