const Product = require('../models/Product.js');

const createProduct = async (req, res) => {
    const { product_name, product_description, product_price, product_num_in_stock, product_image } = req.body;
    const product_owner = req.user.sub;

    try {
        const newProduct = new Product({
            product_name: product_name,
            product_description: product_description,
            product_price: product_price,
            product_num_in_stock: product_num_in_stock,
            product_image: product_image,
            product_owner: product_owner
        });

        const product = await newProduct.save();
        res.status(201).json({ product });
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ _id: id });
        if (!product) {
            res.status(404).json({ error: 'Product Not Found...' });
            return;
        }
        res.status(200).json(product);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, product_description, product_price, product_num_in_stock, product_image } = req.body;

    try {
        const productExists = await Product.findOne({ _id: id });
        if (!productExists) {
            res.status(404).json({ error: 'Product Not Found...' });
            return;
        }

        const updateProduct = await Product.updateOne(
            { _id: id },
            {
                product_name: product_name,
                product_description: product_description,
                product_price: product_price,
                product_num_in_stock: product_num_in_stock,
                product_image: product_image
            }
        );
        res.status(204).json(updateProduct);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productExists = await Product.findOne({ _id: id });
        if (!productExists) {
            res.status(404).json({ error: 'Product Not Found...' });
            return;
        }

        const deleteOne = await Product.deleteOne({ _id: id });
        res.status(204).json(deleteOne);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
    }
}

module.exports.createProduct = createProduct;
module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
