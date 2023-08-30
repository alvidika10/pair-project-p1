const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs' )
app.use(express.urlencoded({extended:true}))
const session = require('express-session')

app.use(session({
    secret: 'rahasia dungss',
    resave: false, //misal kalau gaad perubahan / no change maka tidak usah save, jika true maka jika gaad perubahan ttp save
    saveUninitialized: false, // jika true maka jika user blom login datanya ttp kesave, kalau false maka dh login baru kesave
    cookie: { 
        secure: false, //untuk http or https // jika true maka https jika false maka http
        sameSite: true }  // untuk melindungi dari serangan csrf attack
    }))
app.use(require('./routes/index'))
    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})