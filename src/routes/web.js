const express = require('express');
const DashboardController = require('../controllers/admin/dashboard');
const ProductController = require('../controllers/admin/product');
const AuthController = require('../controllers/admin/auth');
const passport = require("../middlewares/auth");
const checkAuth = require("../middlewares/checkAuth");
const router = express.Router();


const dashboardController = new DashboardController();
const productController = new ProductController();
const authController = new AuthController();

router.get('/admin/login', authController.showFormLogin);

router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
}));
router.use(checkAuth);

router.get('/admin/dashboard', dashboardController.index);
// router.get('/admin/products', productController.pagination)
router.get('/admin/products', productController.index);
router.get('/admin/products/create', productController.showCreateForm);
router.post('/admin/products/create', productController.store);
router.get('/admin/products/delete/:id',productController.delete);
router.get('/admin/products/update/:id',productController.showUpdateForm);
router.post('/admin/products/update/:id',productController.update);

router.get('*', (req, res) => {
    res.render('admin/errors/404.ejs')
})

module.exports = router;
