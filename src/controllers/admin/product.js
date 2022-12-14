const ProductModel = require('../../models/product');
const CategoryModel = require('../../models/category');

class Product {
    async index(req, res) {
        const size = 10;
        const total = await ProductModel.count();
        const numberOfPage = Math.ceil(total / size);
        const page = +req.query.page || 1;
        let products = await ProductModel.find().skip((page-1)*10).limit(10).populate('category');
        res.render('admin/products/list.ejs', {data:{ products,pagination:{total,numberOfPage,page}}});

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
        } catch (e) {
            console.log(e.message)
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
            res.render('error');
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
            res.render("error");
        }
    }
}

module.exports = Product
