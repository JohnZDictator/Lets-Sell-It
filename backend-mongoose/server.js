const express = require('express');
const cors = require('cors');

const UserRoutes = require('./api/routes/user.route.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use('/api/v1/users', UserRoutes);
app.use('*', (req, res) => res.status(404).json({ error: "Not Found" }));

module.exports = app;