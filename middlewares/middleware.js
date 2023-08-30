
let isLoggedIn = function(req, res, next){
    if(!req.session.email){
      let error = 'Silahkan Login terlebih dahulu'
      res.redirect(`/login?error=${error}`)
    } else {
      next()
    }
  }

module.exports = {isLoggedIn}