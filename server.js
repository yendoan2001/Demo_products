const express = require('express');
const path = require("path");
const passport = require('passport');
const app = express();
const port = 8000;
const session = require('express-session');
const bodyParser = require('body-parser')
const router = require('./src/routes/web')
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')
mongoose.set('strictQuery', true);

app.use(fileUpload({
    createParentPath: true
}))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static( 'public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

}));
app.use(passport.authenticate('session'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

app.use('/', router);
app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).render('admin/errors/500')
})

app.listen(port, 'localhost', () => {
    console.log(`server listening on port ${port}`)
})
