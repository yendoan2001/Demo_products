const ProductModel = require('../../models/product');
const CategoryModel = require('../../models/category');

class Product {
    async index(req, res) {
        let products = await ProductModel.find().populate('category');
        console.log(products)
        res.render('admin/products/list.ejs', {data: products});
    }

    async create(req, res) {
        let categories = await CategoryModel.find();
        res.render('admin/products/add.ejs', {data: categories});
    }

    async store(req, res) {
        try {
            await ProductModel.create({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                content: req.body.content,
            })
            res.redirect('/admin/products')
        }catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = Product
