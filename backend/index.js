import mongodb from 'mongodb';
import dotenv from 'dotenv';

import app from './server.js';

import ProductsDAO from './api/dao/productsDAO.js';

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.DATABASE_URI,
    { wtimeoutMS: 2500 }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    await ProductsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`Listening to port, ${port}...`);
    });
});
