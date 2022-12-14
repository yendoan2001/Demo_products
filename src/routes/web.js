const express = require('express');
const DashboardController = require('../controllers/admin/dashboard')
const ProductController = require('../controllers/admin/product')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

const dashboardController = new DashboardController();
const productController = new ProductController();

router.get('/admin/dashboard', dashboardController.index);

router.get('/admin/products', productController.index);
router.get('/admin/products/create', productController.create);
router.post('/admin/products/create', upload.none(), productController.store);
router.get('/admin/products/delete/:id',productController.delete);
router.get('/admin/products/update/:id',productController.showUpdateForm);
router.post('/admin/products/update/:id',upload.none(),productController.update);

router.get('*', (req, res) => {
    res.render('admin/errors/404.ejs')
})

module.exports = router;
