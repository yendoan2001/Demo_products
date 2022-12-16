const ProductModel = require('../../models/product');
const CategoryModel = require('../../models/category');

class Product {
    async index(req, res,next) {
        try {
            const size = 10;
            const total = await ProductModel.count();
            const numberOfPage = Math.ceil(total / size);
            const page = +req.query.page || 1;
            let query = {}
            if (req.query.productName && req.query.productName !== "") {
                let productFindByName = req.query.productName;
                query = {
                    "name": {$regex: productFindByName}
                }
            }
            const products = await ProductModel.find(query).skip((page - 1) * 10).limit(10).populate('category');
            res.render('admin/products/list.ejs', {data: {products, pagination: {total, numberOfPage, page}}});
        } catch (e) {
            next(e);
        }
    }

    async showCreateForm(req, res) {
        try {
            let categories = await CategoryModel.find();
            res.render('admin/products/add.ejs', {data: categories});
        } catch (e) {
            next(e);
        }
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
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res) {
        try {
            const product = await ProductModel.findOne({_id: req.params.id});
            if (product) {
                await product.remove();
                res.redirect('/admin/products');
            } else {
                res.render('error');
            }
        } catch (err) {
            next(e);
        }
    }

    async showUpdateForm(req, res) {
        try {
            const product = await ProductModel.findOne({_id: req.params.id});
            const categories = await CategoryModel.find();
            if (product) {
                res.render("admin/products/update.ejs", {data: {product, categories}});
            } else {
                res.render('error')
            }
        } catch (err) {
            res.render('error');
        }
    }

    async update(req, res) {
        try {
            const product = await ProductModel.findOne({_id: req.params.id});
            console.log(product)
            product.name = req.body.name;
            product.description = req.body.description;
            product.content = req.body.content;
            product.price = req.body.price;
            product.category = req.body.category;
            await product.save();
            if (product) {
                res.redirect("/admin/products");
            } else {
                res.render("error");
            }
        } catch (err) {
            next(e);
        }
    }
}

module.exports = Product
