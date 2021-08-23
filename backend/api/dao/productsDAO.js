import { ObjectId } from 'mongodb';

let products;

export default class ProductsDAO {
    static async injectDB(conn) {
        if (products) {
            return;
        }

        try {
            products = await conn.db(process.env.DATABASE_NS).collection('products');
        } catch (e) {
            console.error(`Unable to establish connection using productsDAO, ${e}`);
        }
    }

    static async getProducts({
        filters = null,
        page = 0,
        productsPerPage = 20
    } = {}) {
        let query;

        if (filters) {
            if ('name' in filters) {
                query = { $text: { $search: filters['name'] } }
            } else if ('category' in filters) {
                query = { 'category': { $eq: filters['category'] } }
            }
        }

        let cursor;
        try {
            cursor = await products.find(query);
        } catch (e) {
            console.error(`Unable to issue a find command, ${e}`);
            return { productsList: [], totalNumProducts: 0 };
        }

        let displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page);
        try {
            const productsList = await displayCursor.toArryay();
            const totalNumProducts = await displayCursor.countDocuments(query);

            return { productsList, totalNumProducts };
        } catch (e) {
            console.error(`Unable to convert cursor to array or count documents, ${e}`);
            return { productsList: [], totalNumProducts: 0 };
        }
    }

    static async getProductById(id) {
        try {
            const product = await products.findOne({ _id: new ObjectId(id) });
            return { product };
        } catch (e) {
            console.error(`Unable to find the product, ${e}`);
            throw e;
        }
    }

    static async postProduct(productInfo) {
        try {
            const product = await products.insertOne(productInfo);
            return { product };
        } catch (e) {
            console.error(`Unable to insert product, ${e}`);
            throw e;
        }
    }

    static async updateProduct(productInfo) {
        try {
            const updateProduct = await products.updateOne({ _id: productInfo._id }, { productInfo: productInfo });
            return { product };
        } catch (e) {
            console.error(`Unable to update product, ${e}`);
            throw e;
        }
    }

    static async deleteProduct(id) {
        try {
            const deleteProduct = await products.deleteOne({ _id: new ObjectId(id) });
        } catch (e) {
            console.error(`Unable to remove product, ${e}`);
            throw e;
        }
    }
}