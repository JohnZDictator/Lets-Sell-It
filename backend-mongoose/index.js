const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Importing our database config
const connectDB = require('./services/db.js');

// Importing our routes
const AuthRoutes = require('./api/routes/auth.route.js');
const RoleRoutes = require('./api/routes/role.route.js');
const UserRoutes = require('./api/routes/user.route.js');
const ProductRoutes = require('./api/routes/product.route.js');

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/roles', RoleRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/products', ProductRoutes);
app.use('*', (req, res) => res.status(404).json({ error: "Not Found" }));


connectDB()
    .then(() => {
        app.listen(port, () => console.log(`Listening on port, ${port}`));
    });