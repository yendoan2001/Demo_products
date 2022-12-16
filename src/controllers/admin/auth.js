class Auth {
    showFormLogin(req, res) {
        res.render('admin/products/login.ejs');
    }
}

module.exports = Auth;