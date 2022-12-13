const mongoose = require('../config/database')
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    content: String,
    price: Number,
    image: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
