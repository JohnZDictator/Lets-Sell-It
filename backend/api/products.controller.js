import ProductsDAO from './dao/productsDAO.js';

export default class ProductsController {
    static async apiGetProducts(req, res, next) {
        const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.category) {
            filters.category = req.query.category;
        }

        const { productsList, totalNumProducts } = await ProductsDAO.find({ filters, page, productsPerPage });

        let response = {
            products: productsList,
            page: page,
            filters: filters,
            entries_per_page: productsPerPage,
            total_results: totalNumProducts
        }

        res.json(response);
    }

    static async apiGetProductById(req, res, next) {
        try {
            let id = req.params.id || {};
            let product = await ProductsDAO.getProductById(id);
            if (!product) {
                res.status(404).json({ error: "Not Found" });
                return;
            }
            res.json(product);
        } catch (e) {
            console.error(`Unable to getProductById, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiPostProduct(req, res, next) {
        try {
            const product = await ProductsDAO.postProduct(req.body);
            res.json(product);
        } catch (e) {
            console.error(`Unable to post a product, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiUpdateProduct(req, res, next) {
        try {
            const updateProduct = await ProductsDAO.updateProduct(req.params.id, req.body);
            res.json(updateProduct);
        } catch (e) {
            console.error(`Unable to update a product, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiDeleteProduct(req, res, next) {
        try {
            const deleteProduct = await ProductsDAO.deleteProduct(req.params.id);
            res.json(deleteProduct);
        } catch (e) {
            console.error(`Unable to delete a product, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}