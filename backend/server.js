import express from 'express';
import cors from 'cors';

import ProductsRoute from './api/products.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('api/v1/products', ProductsRoute);
app.use('*', (req, res) => res.status(404).json({ error: "Not Found" }));

export default app;