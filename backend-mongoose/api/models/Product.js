const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_description: { type: String, required: true },
    product_price: { type: Number, require: true },
    product_count_available_in_stock: { type: Number, required: true },
    product_image: { type: mongoose.Schema.Types.map },
});

module.exports = mongoose.model('Product', productSchema);